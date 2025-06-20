import { DateTime } from "luxon"
import { UserPass } from "../domain/models/User"
import { UserRepository } from "../services/UserService"
import { sql } from "../utils/sql"
import { SqliteConnection } from "../utils/sqliteConnection"
import { ErrorType } from "../utils/tryCatch"

export const makeSqliteUserRepository = (
  sqliteConnection: SqliteConnection,
): UserRepository => {
  // Internal db safe format for the User. Safe fields for sqlite
  type DbUserTruely = {
    id: string
    name: string
    email: string
    birthday: string | null
    about: string | null
    facebook: string | null
    passwordHash: string
  }

  const toDbUserTruely = (user: UserPass): DbUserTruely => ({
    ...user,
    birthday: user?.birthday?.toISODate() ?? null,
    about: user?.about ?? null,
    facebook: user?.facebook ?? null,
  })

  const fromDbUserTruely = (user: DbUserTruely): UserPass => ({
    ...user,
    birthday: user.birthday ? DateTime.fromISO(user.birthday) : undefined,
    about: user.about ?? "",
    facebook: user.facebook ?? "",
  })

  const saveUser = async (user: UserPass) => {
    const { id, name, email, birthday, about, facebook, passwordHash } =
      toDbUserTruely(user)

    // console.log("Test 4: Save USer", id, name, about)

    await sqliteConnection.run(
      sql`
      INSERT INTO user 
        (id, name, email, birthday,  about, facebook, passwordHash) 
      VALUES 
        (${id}, ${name}, ${email}, ${birthday} ,${about} , ${facebook}, ${passwordHash} )`,
    )
  }

  const updateUser = async (user: UserPass) => {
    const { id, name, email, birthday, about, facebook, passwordHash } =
      toDbUserTruely(user)

    console.log("Test 4: Save USer", id, name, about)

    await sqliteConnection.run(
      // sql`
      // UPDATE user SET
      //   (id, name, email, birthday,  about, facebook, passwordHash)
      // VALUES
      //   (${id}, ${name}, ${email}, ${birthday} ,${about} , ${facebook}, ${passwordHash} )
      // WHERE
      //    id = ${id}`,

      sql`
    UPDATE user SET 
      name = ${name},
      email = ${email},
      birthday = ${birthday},
      about = ${about},
      facebook = ${facebook},
      passwordHash = ${passwordHash}
    WHERE id = ${id}
  `,
    )
  }

  const getUser = async (
    id: string,
  ): Promise<ErrorType<UserPass, "NotFound" | Error>> => {
    // Types are a problem here, DbUser date fields are DateTime but must be str...
    const [user] = await sqliteConnection.all<UserPass>(
      sql`SELECT * FROM user WHERE id = ${id}`,
    )

    if (!user) {
      return ["NotFound", null] as const
    }

    // STUPID!
    user.birthday = user.birthday
      ? DateTime.fromISO(user.birthday as unknown as string)
      : undefined
    return [null, user] as const
  }

  const getUserByEmail = async (
    email: string,
  ): Promise<ErrorType<UserPass, "NotFound" | Error>> => {
    const [dbUser] = await sqliteConnection.all<DbUserTruely>(
      sql`SELECT * FROM user WHERE email = ${email}`,
    )

    if (!dbUser) {
      return ["NotFound", null] as const
    }

    const user = fromDbUserTruely(dbUser)
    return [null, user] as const
  }

  // const getUserBy = async (
  //   params: { type: "email"; value: string } | { type: "id"; value: string },
  // ) => {
  //   let condition = sql``
  //   switch (params.type) {
  //     case "email": {
  //       condition = sql`id = ${params.value}`
  //       break
  //     }
  //     case "id": {
  //       condition = sql`email = ${params.value}`
  //       break
  //     }
  //   }

  //   const [dbUser] = await sqliteConnection.all<DbUserTruely>(sql`
  //     SELECT *
  //     FROM users
  //     WHERE ${condition}
  //   `)
  //   if (!dbUser) {
  //     return ["NotFound", null] as const
  //   }

  //   const user = fromDbUserTruely(dbUser)
  //   return [null, user] as const
  // }

  return {
    saveUser,
    getUser,
    getUserByEmail,
    updateUser,
    // getUserBy,
  }
}
