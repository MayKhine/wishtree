import bcrypt from "bcrypt"
import { AuthAdapter } from "../services/UserService"
import { tryCatch } from "../utils/tryCatch"

export const makeAuthAdapter = (): AuthAdapter => {
  const saltRounds = 10

  const hash = async (password: string) =>
    tryCatch(() => bcrypt.hash(password, saltRounds))

  const verify = async (password: string, hashedPassword: string) =>
    tryCatch(() => bcrypt.compare(password, hashedPassword))

  return {
    hash,
    verify,
  }
}
