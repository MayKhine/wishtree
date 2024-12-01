import { DateTime } from "luxon"
import { v4 as uuidv4 } from "uuid"
import { User } from "../domain/models/User"
import { ErrorType } from "../utils/tryCatch"

export const makeUserService = (
  userRepository: UserRepository,
  authAdapter: AuthAdapter,
  jwtMinter: JwtMinterAdapter,
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

  return {
    createUser,
    login,
    // TODO authenticate and get the user
    authenticate: (token: string) => [null, null],
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
  verifyToken(token: string): object | null
}
