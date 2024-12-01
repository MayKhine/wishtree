import jwt from "jsonwebtoken"
import { JwtMinterAdapter } from "../services/UserService"

export const makeJwtMinterAdapter = (
  options: JwtMinterAdapterOptions,
): JwtMinterAdapter => {
  const secret = ""

  const generateToken = (payload: Record<string, unknown>) => {
    return jwt.sign(payload, secret, {
      expiresIn: options.expiresInSeconds || "1h",
    })
  }

  const verifyToken = (token: string) => {
    return jwt.verify(token, secret) as Record<string, unknown>
  }

  return {
    generateToken,
    verifyToken,
  }
}
export type JwtMinterAdapterOptions = {
  jwt: string
  expiresInSeconds?: number
}
