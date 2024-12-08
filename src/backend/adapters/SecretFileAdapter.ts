import { randomBytes } from "crypto"
import { SecretManagerAdapter } from "../services/UserService"
import { FileStorageHelper } from "../utils/fileStorageHelper"
import { ErrorType } from "../utils/tryCatch"

const secretFileName = "secret"

export const makeSecretFileAdapter = (
  fileAdapter: FileStorageHelper,
): SecretManagerAdapter => {
  let cachedSecret: string | undefined

  const getSecret = async (): Promise<ErrorType<string, Error>> => {
    if (cachedSecret) {
      return [null, cachedSecret]
    }
    const [readError, fileContents] =
      await fileAdapter.readFileString(secretFileName)

    if (readError === "ENOENT") {
      return generateSecret()
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
    getSecret,
  }
}
