import { describe, expect, test } from "vitest"
import { makeAuthAdapter } from "./AuthAdapter"

describe("AuthAdapter", () => {
  test("salts password", async () => {
    const adapter = makeAuthAdapter()

    const [err, res] = await adapter.hash("foobarbaz")
    if (err) {
      throw err
    }
    expect(res).not.toBe("foobarbaz")
  })

  test("salts then verifies correctly", async () => {
    const adapter = makeAuthAdapter()
    const password = "foobarbaz"

    const [saltError, salted] = await adapter.hash(password)
    if (saltError) {
      throw saltError
    }

    const [verifyErr, verifyResult] = await adapter.verify(password, salted)
    if (verifyErr) {
      throw verifyErr
    }

    expect(verifyResult).toBe(true)
  })

  test("salts then verifies correctly", async () => {
    const adapter = makeAuthAdapter()
    const password = "foobarbaz"
    const differentPassword = "foobarBaZ"

    const [saltError, salted] = await adapter.hash(password)
    if (saltError) {
      throw saltError
    }

    const [verifyErr, verifyResult] = await adapter.verify(
      differentPassword,
      salted,
    )
    if (verifyErr) {
      throw verifyErr
    }

    expect(verifyResult).toBe(false)
  })
})
