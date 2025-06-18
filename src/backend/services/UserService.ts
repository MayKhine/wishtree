import { DateTime } from "luxon"
import { v4 as uuidv4 } from "uuid"
import { UpserUserDataRequest } from "../domain/models/UpsertUserData"
import { User, UserPass } from "../domain/models/User"
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

    const [getSecretError, secret] = await secretAdapter.getSecret()
    if (getSecretError) {
      return [getSecretError, null] as const
    }

    console.log("generate token from user", newUser)
    const token = jwtMinter.generateToken({ user: newUser }, secret)

    return [null, { token, user: newUser }] as const
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

    const safeUser = dbUserToUser(user)

    const token = jwtMinter.generateToken({ user: safeUser }, secret)

    return [null, { token, user: safeUser }] as const
  }

  // Check if the token is valid
  const authenticate = async (
    token: string,
  ): Promise<ErrorType<UserPass, Error | "NotFound">> => {
    const [getSecretError, secret] = await secretAdapter.getSecret()
    if (getSecretError) {
      return [getSecretError, null]
    }

    const object = (await jwtMinter.verifyToken(token, secret)) as {
      user: UserPass
    }

    const [getUserError, user] = await userRepository.getUser(object.user.id)

    if (getUserError) {
      return [getUserError, null]
    }

    return [null, user]
  }

  const upsertLoginUser = async (
    upsertRequest: UpserUserDataRequest,
    user: User | undefined,
  ) => {
    console.log(
      "test 3, upsert log in user ",
      upsertRequest.email,
      upsertRequest.birthday,
    )

    const [error, passwordHash] = await authAdapter.hash(upsertRequest.password)
    if (error) {
      return [error, null] as const
    }

    const updatedUser = {
      id: upsertRequest.id,
      name: upsertRequest.name,
      email: upsertRequest.email,
      birthday: upsertRequest.birthday,
      about: upsertRequest.about,
      facebook: upsertRequest.facebook,
    }
    try {
      await userRepository.updateUser({
        ...updatedUser,
        passwordHash,
      })
      console.log("User saved successfully")
      return [null, updatedUser] as const
    } catch (e) {
      console.error("Error saving user:", e)
      return [e, null] as const
    }
  }

  return {
    createUser,
    login,
    authenticate,
    upsertLoginUser,
  }
}

export type UserService = ReturnType<typeof makeUserService>

export type CreateUserInput = {
  name: string
  email: string
  birthday?: DateTime
  about?: string
  facebook?: string
  password: string
}

export type UserRepository = {
  saveUser(user: UserPass): Promise<void>
  updateUser(user: UserPass): Promise<void>
  getUser(id: string): Promise<ErrorType<UserPass, "NotFound" | Error>>
  getUserByEmail(
    email: string,
  ): Promise<ErrorType<UserPass, "NotFound" | Error>>
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
