import { before } from "node:test"
import { describe, expect, test, vi } from "vitest"
import { FileStorageHelper } from "../utils/fileStorageHelper"
import { ErrorType } from "../utils/tryCatch"
import { makeSecretFileAdapter } from "./SecretFileAdapter"

const makeMockFileAdapter = () => {
  let secret: string
  return {
    readFileJson: vi.fn(),
    writeFileJson: vi.fn(),
    readFileString: async () => {
      return ["ENOENT", null]
    },
    init: vi.fn(),
    fileExists: vi.fn(),
    getPathToFile: vi.fn(),
    writeFileStr: vi.fn(
      async (
        path: string,
        contents: string,
      ): Promise<ErrorType<void, Error>> => {
        return [null, undefined] as const
      },
    ),
  } satisfies FileStorageHelper
}

describe("secretFileAdapter", () => {
  test("saves", async () => {
    const fileAdapter = makeMockFileAdapter()
    const secretFileAdapter = makeSecretFileAdapter(fileAdapter)

    const [err, secret] = await secretFileAdapter.getSecret()
    if (err) {
      throw err
    }

    expect(fileAdapter.writeFileStr).toHaveBeenCalledWith("secret", secret)

    expect(secret).not.toBeFalsy()
  })
})
