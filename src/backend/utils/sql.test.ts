import { describe, expect, test } from "vitest"
import { sql } from "./sql"

describe("sql", () => {
  test("multiple fragments inline", () => {
    const idFilter = sql`id = ${123}`
    const emailFilter = sql`email = ${"test@example.com"}`

    const query = sql`
      SELECT *
      FROM users
      WHERE ${idFilter} AND ${emailFilter}
    `

    console.log(query)
    expect(query.query).toEqual(`
      SELECT *
      FROM users
      WHERE id = $1 AND email = $2
    `)

    expect(query.params).toEqual([123, "test@example.com"])
  })

  test("join", () => {
    const filters = [
      sql`age >= ${18}`,
      sql`status = ${"active"}`,
      sql`country = ${"USA"}`,
    ]

    const { query, params } = sql.join(filters, sql` AND `)

    expect(query).toEqual(`age >= $1 AND status = $2 AND country = $3`)
  })

  test("yz", () => {
    const filters = [
      sql`age >= ${18}`,
      sql`status = ${"active"}`,
      sql`country = ${"USA"}`,
    ]

    const query = sql`
      SELECT *
      FROM users
      WHERE ${sql.join(filters, sql` AND `)}
    `

    expect(query.query).toEqual(`
      SELECT *
      FROM users
      WHERE age >= $1 AND status = $2 AND country = $3
    `)

    expect(query.params).toEqual([18, "active", "USA"])
  })
})
