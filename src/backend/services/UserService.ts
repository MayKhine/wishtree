import { DateTime } from "luxon"
import { v4 as uuidv4 } from "uuid"
import { User } from "../domain/models/User"
import { ErrorType } from "../utils/tryCatch"

export const makeUserService = (
  userRepository: UserRepository,
  authAdapter: AuthAdapter,
  jwtMinter: JwtMinterAdapter,
  secretAdapter: SecretManagerAdapter,
) => {
  const createUser = async ({ password, ...rest }: CreateUserInput) => {
    const newUser = { ...rest, id: uuidv4() }

    const [error, passwordHash] = await authAdapter.hash(password)
    if (error) {
      return [error, null] as const
    }
    await userRepository.saveUser({ ...newUser, passwordHash })

    return [null, undefined] as const
  }

  const login = async (email: string, password: string) => {
    const [getUserError, user] = await userRepository.getUserByEmail(email)
    if (getUserError) {
      return [getUserError, null] as const
    }

    const [verifyHashError, isValidPassword] = await authAdapter.verify(
      user.passwordHash,
      password,
    )
    if (verifyHashError) {
      return [verifyHashError, null] as const
    }

    if (!isValidPassword) {
      return ["InvalidPassword", null] as const
    }

    const token = jwtMinter.generateToken({ user })

    return [null, token]
  }

  const authenticate = async (
    token: string,
  ): Promise<ErrorType<User, Error | "NotFound">> => {
    const [getSecretError, getSecretResult] = await secretAdapter.getSecret()

    let secret: string
    if (getSecretError === "NotFound") {
      const [secretError, generatedSecret] =
        await secretAdapter.generateSecret()
      if (secretError) {
        return [secretError, null]
      }
      secret = generatedSecret
    } else if (getSecretError) {
      return [getSecretError, null]
    } else {
      secret = getSecretResult
    }

    const object = (await jwtMinter.verifyToken(token, secret)) as {
      user: User
    }

    const [getUserError, user] = await userRepository.getUser(object.user.id)

    if (getUserError) {
      return [getUserError, null]
    }

    return [null, user]
  }

  return {
    createUser,
    login,
    authenticate,
  }
}

export type UserService = ReturnType<typeof makeUserService>

export type CreateUserInput = {
  name: string
  email: string
  birthday: DateTime
  password: string
}

export type UserRepository = {
  saveUser(user: User): Promise<void>
  getUser(id: string): Promise<ErrorType<User, "NotFound" | Error>>
  getUserByEmail(email: string): Promise<ErrorType<User, "NotFound" | Error>>
}

export type AuthAdapter = {
  hash(password: string): Promise<ErrorType<string, Error>>
  verify(
    password: string,
    passwordHash: string,
  ): Promise<ErrorType<boolean, Error>>
}

export type JwtMinterAdapter = {
  generateToken(payload: object): string
  verifyToken(token: string, secret: string): object | null
}

export type SecretManagerAdapter = {
  secretExists: () => Promise<ErrorType<boolean, Error>>
  getSecret: () => Promise<ErrorType<string, Error | "NotFound">>
  generateSecret: () => Promise<ErrorType<string, Error>>
}
