import { User } from "../domain/models/User"
import { UserRepository } from "../services/UserService"
import { sql } from "../utils/sql"
import { SqliteConnection } from "../utils/sqliteConnection"
import { ErrorType } from "../utils/tryCatch"

export const makeSqliteUserRepository = (
  sqliteConnection: SqliteConnection,
): UserRepository => {
  const saveUser = async ({ id, name, email, passwordHash }: User) => {
    await sqliteConnection.run(
      sql`INSERT INTO user (id, name, email, birthday, passwordHash) VALUES (${id}, ${name}, ${email}, ${passwordHash})`,
    )
  }

  const getUser = async (
    id: string,
  ): Promise<ErrorType<User, "NotFound" | Error>> => {
    const [user] = await sqliteConnection.all<User>(
      sql`SELECT * FROM user WHERE id = ${id}`,
    )

    if (!user) {
      return ["NotFound", null] as const
    }

    return [null, user] as const
  }

  return {
    saveUser,
    getUser,
  }
}
