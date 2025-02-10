import { DateTime } from "luxon"
import { UserPass } from "../domain/models/User"
import { UserRepository } from "../services/UserService"
import { PageParam } from "../types/Page"
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
    passwordHash: string
  }

  const toDbUserTruely = (user: UserPass): DbUserTruely => ({
    ...user,
    birthday: user?.birthday?.toISODate() ?? null,
  })

  const fromDbUserTruely = (user: DbUserTruely): UserPass => ({
    ...user,
    birthday: user.birthday ? DateTime.fromISO(user.birthday) : undefined,
  })

  const saveUser = async (user: UserPass) => {
    const { id, name, email, birthday, passwordHash } = toDbUserTruely(user)
    await sqliteConnection.run(
      sql`
      INSERT INTO user 
        (id, name, email, birthday, passwordHash) 
      VALUES 
        (${id}, ${name}, ${email}, ${birthday}, ${passwordHash})`,
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

  const getUserBy = async (
    params: { type: "email"; value: string } | { type: "id"; value: string },
  ) => {
    let condition = sql``
    switch (params.type) {
      case "email": {
        condition = sql`id = ${params.value}`
        break
      }
      case "id": {
        condition = sql`email = ${params.value}`
        break
      }
    }

    const [dbUser] = await sqliteConnection.all<DbUserTruely>(sql`
      SELECT *
      FROM users
      WHERE ${condition}
    `)
    if (!dbUser) {
      return ["NotFound", null] as const
    }

    const user = fromDbUserTruely(dbUser)
    return [null, user] as const
  }

  const findUsers = async ({
    text,
    limit,
    offset,
  }: PageParam & { text: string }) => {
    const searchTerm = `%${text}%`
    const users = await sqliteConnection.all<DbUserTruely>(sql`
      SELECT *
      FROM users
      WHERE LOWER(email) LIKE LOWER(${searchTerm})
        OR LOWER(name) LIKE LOWER(${searchTerm})
      LIMIT ${limit} OFFSET ${offset ?? 0};
    `)

    return {
      data: users.map(fromDbUserTruely),
    }
  }

  return {
    saveUser,
    getUser,
    getUserByEmail,
    findUsers,
  }
}
