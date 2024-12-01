import { DateTime } from "luxon"

export type User = {
  id: string
  name: string
  email: string
  birthday: DateTime
  passwordHash: string
}
