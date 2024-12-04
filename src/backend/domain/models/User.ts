import { DateTime } from "luxon"

export type UserPass = User & {
  passwordHash: string
}

export type User = {
  id: string
  name: string
  email: string
  birthday?: DateTime
}
