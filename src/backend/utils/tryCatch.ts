export type ErrorType<Data, Err> = [Err, null] | [null, Data]

export const tryCatch = async <T, E = Error>(
  fn: () => Promise<T>,
): Promise<ErrorType<T, E>> => {
  try {
    const result = await fn()
    return [null, result]
  } catch (error) {
    return [error as E, null]
  }
}
