export type SqlFragment = { query: string; params: Array<SqlParam> }

export type SqlParam = string | number | boolean | null

// https://chatgpt.com/c/674bebd6-da34-8010-bb48-543406d11a24
// this sucks because it is doing regex to replace already compiled sql
export function sql(
  strings: TemplateStringsArray,
  ...values: Array<SqlParam | SqlFragment>
): SqlFragment {
  const params: SqlParam[] = []
  const queryComponents: string[] = []

  for (let i = 0; i < strings.length; i++) {
    const str = strings[i]
    const value = values[i]

    queryComponents.push(str)

    if (value === undefined) continue

    if (isSqlFragment(value)) {
      // Adjust parameter placeholders for embedded fragments
      const offset = params.length
      const adjustedQuery = value.query.replace(
        /\$(\d+)/g,
        (_, index) => `$${+index + offset}`,
      )
      queryComponents.push(adjustedQuery)
      params.push(...value.params)
    } else {
      // Add a single parameter
      queryComponents.push(`$${params.length + 1}`)
      params.push(value)
    }
  }

  return {
    query: queryComponents.join(""),
    params,
  }
}

sql.join = function (
  fragments: SqlFragment[],
  separator: SqlFragment | string,
): SqlFragment {
  const queryParts: string[] = []
  const params: SqlParam[] = []

  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i]
    const offset = params.length

    // Adjust placeholders in each fragment
    const adjustedQuery = fragment.query.replace(
      /\$(\d+)/g,
      (_, index) => `$${+index + offset}`,
    )
    queryParts.push(adjustedQuery)
    params.push(...fragment.params)

    if (i < fragments.length - 1) {
      // Add the separator
      if (typeof separator === "string") {
        queryParts.push(separator)
      } else {
        const separatorQuery = separator.query.replace(
          /\$(\d+)/g,
          (_, index) => `$${+index + params.length}`,
        )
        queryParts.push(separatorQuery)
        params.push(...separator.params)
      }
    }
  }

  return {
    query: queryParts.join(""),
    params,
  }
}

function isSqlFragment(value: any): value is SqlFragment {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.query === "string" &&
    Array.isArray(value.params)
  )
}
