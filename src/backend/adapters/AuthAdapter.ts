import { compare as bcCompare, hash as bcHash } from "bcrypt-ts"

import { AuthAdapter } from "../services/UserService"
import { tryCatch } from "../utils/tryCatch"

export const makeAuthAdapter = (): AuthAdapter => {
  const saltRounds = 10

  const hash = async (password: string) =>
    tryCatch(() => bcHash(password, saltRounds))

  const verify = async (password: string, hashedPassword: string) =>
    tryCatch(() => bcCompare(password, hashedPassword) as Promise<boolean>)

  return {
    hash,
    verify,
  }
}
