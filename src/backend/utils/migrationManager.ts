import { migrations } from "../migrations"
import { sql } from "./sql.old"
import { SqliteConnection } from "./sqliteConnection"

export const runMigrations = async (sqliteConnection: SqliteConnection) => {
  await _runMigrations(sqliteConnection, migrations)
}

const _runMigrations = async (
  sqliteConnection: SqliteConnection,
  migrations: Array<Migration>,
) => {
  await sqliteConnection.run(sql`
    CREATE TABLE IF NOT EXISTS Migration (
      id TEXT PRIMARY KEY,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  const appliedMigrations = await sqliteConnection.all<{ id: string }>(
    sql`SELECT id FROM Migration;`,
  )
  const appliedMigrationIds = new Set(appliedMigrations.map((row) => row.id))

  for (const { id, up } of migrations) {
    if (!appliedMigrationIds.has(id)) {
      console.log(`Applying migration: ${id}`)
      // await db.exec(sql)
      await up(sqliteConnection)
      await sqliteConnection.run(
        sql`INSERT INTO Migration (id) VALUES (${id});`,
      )
      console.log(`Migration applied: ${id}`)
    }
  }
}
export type Migration = {
  id: string
  up: (connection: SqliteConnection) => Promise<void>
  down: (connection: SqliteConnection) => Promise<void>
}
