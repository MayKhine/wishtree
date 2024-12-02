import { DateTime } from "luxon"
import { DbUser } from "../domain/models/User"
import { UserRepository } from "../services/UserService"
import { sql } from "../utils/sql"
import { SqliteConnection } from "../utils/sqliteConnection"
import { ErrorType } from "../utils/tryCatch"

export const makeSqliteUserRepository = (
  sqliteConnection: SqliteConnection,
): UserRepository => {
  const saveUser = async ({
    id,
    name,
    email,
    passwordHash,
    birthday,
  }: DbUser) => {
    await sqliteConnection.run(
      sql`INSERT INTO user (id, name, email, birthday, passwordHash) VALUES (${id}, ${name}, ${email}, ${birthday?.toISODate()}, ${passwordHash})`,
    )
  }

  const getUser = async (
    id: string,
  ): Promise<ErrorType<DbUser, "NotFound" | Error>> => {
    // Types are a problem here, DbUser date fields are DateTime but must be str...
    const [user] = await sqliteConnection.all<DbUser>(
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
  ): Promise<ErrorType<DbUser, "NotFound" | Error>> => {
    const [user] = await sqliteConnection.all<DbUser>(
      sql`SELECT * FROM user WHERE email = ${email}`,
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

  return {
    saveUser,
    getUser,
    getUserByEmail,
  }
}
