import { randomBytes } from "crypto"
import { SecretManagerAdapter } from "../services/UserService"
import { FileStorageHelper } from "../utils/fileStorageHelper"
import { ErrorType } from "../utils/tryCatch"

const secretFileName = "secret"

export const makeSecretFileAdapter = (
  fileAdapter: FileStorageHelper,
): SecretManagerAdapter => {
  let cachedSecret: string | undefined

  const secretExists = async (): Promise<ErrorType<boolean, Error>> => {
    const exists = await fileAdapter.fileExists(secretFileName)

    return [null, exists] as const
  }

  const getSecret = async (): Promise<
    ErrorType<string, Error | "NotFound">
  > => {
    if (cachedSecret) {
      return [null, cachedSecret]
    }
    const [readError, fileContents] =
      await fileAdapter.readFileString(secretFileName)

    if (readError === "ENOENT") {
      return ["NotFound", null]
    } else if (readError) {
      return [readError, null]
    }

    cachedSecret = fileContents
    return [null, fileContents]
  }

  const generateSecret = async (): Promise<ErrorType<string, Error>> => {
    cachedSecret = randomBytes(64).toString("hex")
    const [writeErr] = await fileAdapter.writeFileStr(
      secretFileName,
      cachedSecret,
    )
    if (writeErr) {
      return [writeErr, null]
    }
    return [null, cachedSecret]
  }

  return {
    secretExists,
    getSecret,
    generateSecret,
  }
}
