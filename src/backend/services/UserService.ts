import { DateTime } from "luxon"
import { v4 as uuidv4 } from "uuid"
import { User, UserPass } from "../domain/models/User"
import { PageParam } from "../types/Page"
import { ErrorType } from "../utils/tryCatch"

export const makeUserService = (
  userRepository: UserRepository,
  authAdapter: AuthAdapter,
  jwtMinter: JwtMinterAdapter,
  secretAdapter: SecretManagerAdapter,
) => {
  const dbUserToUser = ({ passwordHash: _, ...rest }: UserPass): User => {
    return { ...rest }
  }

  // Create the user and mint a token
  const createUser = async ({ password, ...rest }: CreateUserInput) => {
    const [getUserError, user] = await userRepository.getUserByEmail(rest.email)

    if (getUserError && getUserError !== "NotFound") {
      return [getUserError, null] as const
    }
    if (user) {
      return ["AccountExists", null] as const
    }

    const [error, passwordHash] = await authAdapter.hash(password)
    if (error) {
      return [error, null] as const
    }

    const newUser = { ...rest, id: uuidv4() }
    await userRepository.saveUser({ ...newUser, passwordHash })

    // Get user for return - this error should never happen if save worked.
    const [getUserErr, userOut] = await userRepository.getUser(newUser.id)
    if (getUserErr) {
      return [getUserErr, null] as const
    }

    const [getSecretError, secret] = await secretAdapter.getSecret()
    if (getSecretError) {
      return [getSecretError, null] as const
    }

    const token = jwtMinter.generateToken({ user: newUser }, secret)

    const userNoPass = dbUserToUser(userOut)

    return [null, { token, user: userNoPass }] as const
  }

  // Check if password is correct for the email, and mint a token
  const login = async (email: string, password: string) => {
    const [getUserError, user] = await userRepository.getUserByEmail(email)
    if (getUserError) {
      return [getUserError, null] as const
    }

    const [getSecretError, secret] = await secretAdapter.getSecret()
    if (getSecretError) {
      return [getSecretError, null] as const
    }

    const [verifyHashError, isValidPassword] = await authAdapter.verify(
      password,
      user.passwordHash,
    )
    if (verifyHashError) {
      return [verifyHashError, null] as const
    }

    if (!isValidPassword) {
      return ["InvalidPassword", null] as const
    }

    const userNoPass = dbUserToUser(user)

    const token = jwtMinter.generateToken({ user: userNoPass }, secret)

    return [null, { token, user: userNoPass }] as const
  }

  // Check if the token is valid
  const authenticate = async (
    token: string,
  ): Promise<ErrorType<User, Error | "NotFound">> => {
    const [getSecretError, secret] = await secretAdapter.getSecret()
    if (getSecretError) {
      return [getSecretError, null]
    }

    // this isn't exaclty right... jwt contains a slimmer user.
    const object = (await jwtMinter.verifyToken(token, secret)) as {
      user: UserPass
    }

    const [getUserError, user] = await userRepository.getUser(object.user.id)

    if (getUserError) {
      return [getUserError, null]
    }

    const userNoPass = dbUserToUser(user)

    return [null, userNoPass]
  }

  const findUsers = async (params: PageParam & { text: string }) => {
    const result = await userRepository.findUsers(params)
    return {
      // do not return user with a pass!
      data: result.data.map(dbUserToUser),
    }
  }

  return {
    createUser,
    login,
    authenticate,
    findUsers,
  }
}

export type UserService = ReturnType<typeof makeUserService>

export type CreateUserInput = {
  name: string
  email: string
  birthday?: DateTime
  password: string
}

export type UserRepository = {
  saveUser(user: UserPass): Promise<void>
  getUser(id: string): Promise<ErrorType<UserPass, "NotFound" | Error>>
  getUserByEmail(
    email: string,
  ): Promise<ErrorType<UserPass, "NotFound" | Error>>
  findUsers(
    params: PageParam & { text: string },
  ): Promise<{ data: Array<UserPass> }>
}

export type AuthAdapter = {
  hash(password: string): Promise<ErrorType<string, Error>>
  verify(
    password: string,
    passwordHash: string,
  ): Promise<ErrorType<boolean, Error>>
}

export type JwtMinterAdapter = {
  generateToken(payload: object, secret: string): string
  verifyToken(token: string, secret: string): object | null
}

export type SecretManagerAdapter = {
  getSecret: () => Promise<ErrorType<string, Error>>
}
