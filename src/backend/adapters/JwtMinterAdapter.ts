import jwt from "jsonwebtoken"
import { JwtMinterAdapter } from "../services/UserService"

export const makeJwtMinterAdapter = (
  options: JwtMinterAdapterOptions,
): JwtMinterAdapter => {
  const generateToken = (payload: Record<string, unknown>, secret: string) => {
    return jwt.sign(payload, secret, {
      expiresIn: options.expiresInSeconds || "1y",
    })
  }

  const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as Record<string, unknown>
  }

  return {
    generateToken,
    verifyToken,
  }
}
export type JwtMinterAdapterOptions = {
  expiresInSeconds?: number
}
