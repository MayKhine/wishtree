import { DateTime } from "luxon"

export type DbUser = {
  id: string
  name: string
  email: string
  birthday?: DateTime
  passwordHash: string
}

export type User = {
  id: string
  name: string
  email: string
  birthday?: DateTime
}
