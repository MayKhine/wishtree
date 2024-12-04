import { describe, expect, test } from "vitest"
import { sql } from "./sql.old"

describe.only("sql", () => {
  test("basic", () => {
    const result = sql`SELECT * FROM USERS WHERE id = ${"hello"}`.produce()

    expect(result.query).toBe(`SELECT * FROM USERS WHERE id = $1`)
    expect(result.values).toEqual(["hello"])
  })

  test("multiple fragments inline", () => {
    const idFilter = sql`id = ${123}`
    const emailFilter = sql`email = ${"test@example.com"}`

    const query = sql`
      SELECT *
      FROM users
      WHERE ${idFilter} AND ${emailFilter}
    `.produce()

    expect(query.query).toEqual(`
      SELECT *
      FROM users
      WHERE id = $1 AND email = $2
    `)

    expect(query.values).toEqual([123, "test@example.com"])
  })

  test("join", () => {
    const filters = [
      sql`age >= ${18}`,
      sql`status = ${"active"}`,
      sql`country = ${"USA"}`,
    ]

    // TODO!
    // SHOULD THE JOIN BE SQL?
    const { query, values } = sql.join(filters, ` AND `).produce()

    expect(query).toEqual(`age >= $1 AND status = $2 AND country = $3`)
  })

  test("joins filters", () => {
    const filters = [
      sql`age >= ${18}`,
      sql`status = ${"active"}`,
      sql`country = ${"USA"}`,
    ]

    const query = sql`
      SELECT *
      FROM users
      WHERE ${sql.join(filters, ` AND `)}
    `.produce()

    expect(query.query).toEqual(`
      SELECT *
      FROM users
      WHERE age >= $1 AND status = $2 AND country = $3
    `)

    expect(query.values).toEqual([18, "active", "USA"])
  })

  test("arrays as primitives", () => {
    const query = sql`
      SELECT *
      FROM users
      WHERE id in ${[1, 2, 3, 4]}
    `.produce()

    console.log("query is", query.query)

    expect(query.query).toEqual(`
      SELECT *
      FROM users
      WHERE id in ($1, $2, $3, $4)
    `)

    expect(query.values).toEqual([1, 2, 3, 4])
  })

  test("arrays as primitives with offset", () => {
    const query = sql`
      SELECT *
      FROM users
      WHERE name = ${"ethu"} OR id in ${[1, 2, 3, 4]}
    `.produce()

    console.log("query is", query.query)

    expect(query.query).toEqual(`
      SELECT *
      FROM users
      WHERE name = $1 OR id in ($2, $3, $4, $5)
    `)

    expect(query.values).toEqual(["ethu", 1, 2, 3, 4])
  })
})
