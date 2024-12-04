export type SqlProducer = {
  produce: (offset?: number) => ProducedSql
}

export type ProducedSql = {
  values: Array<SimpleParam>
  query: string
}

// maybe others?
export type SimpleParam = string | number | boolean
export type SqlParam = Array<SimpleParam> | SimpleParam | SqlProducer

export const sql = (
  strings: TemplateStringsArray,
  ...values: Array<SqlParam>
): SqlProducer => {
  return produceFragment(strings, values)
}

const produceFragment = (
  strings: TemplateStringsArray,
  values: Array<SqlParam>,
): SqlProducer => {
  return {
    produce: (offset: number = 0) => {
      const newStrings = new Array<string>()
      const newValues = new Array<SimpleParam>()

      for (let i = 0; i < values.length; i++) {
        const str = strings[i]
        const value = values[i]
        if (isSqlProducer(value)) {
          newStrings.push(str)
          const subFields = value.produce(newValues.length)
          newStrings.push(subFields.query)
          newValues.push(...subFields.values)
        } else {
          if (Array.isArray(value)) {
            const arrayStringComponents = []
            for (const subValue of value) {
              newValues.push(subValue)
              arrayStringComponents.push(`$${newValues.length}`)
            }
            newStrings.push(str)
            newStrings.push(`(${arrayStringComponents.join(", ")})`)
          } else {
            newValues.push(value)
            newStrings.push(str, `$${newValues.length + offset}`)
          }
        }
      }
      // always gotta be one more strings than values
      newStrings.push(strings.at(-1)!)

      return {
        query: newStrings.join(""),
        values: newValues,
      }
    },
  }
}

const isSqlProducer = (value: any): value is SqlProducer => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

sql.join = function (
  fragments: SqlProducer[],
  separator: string | SqlProducer, // TODO should this be sql?
): SqlProducer {
  return {
    produce: (offset: number = 0) => {
      const queryParts: string[] = []
      const values: SimpleParam[] = []

      const joinQp = new Array<string>()
      const joinValues = new Array<SimpleParam>()
      if (isSqlProducer(separator)) {
        // TODO!
      } else {
        joinQp.push(separator)
      }

      for (let i = 0; i < fragments.length; i++) {
        const frag = fragments[i]
        const subFields = frag.produce(offset + values.length)
        values.push(...subFields.values)
        queryParts.push(subFields.query)
        if (i === fragments.length - 1) {
          continue
        }

        // TODO unpak the join?
        values.push(...joinValues)
        queryParts.push(joinQp.join(""))
      }

      return {
        query: queryParts.join(""),
        values,
      }
    },
  }
}
