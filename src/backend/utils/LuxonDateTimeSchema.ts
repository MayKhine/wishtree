import { DateTime } from "luxon"
import { z } from "zod"

export const LuxonDateTimeSchema = z
  .string()
  .refine((value) => DateTime.fromISO(value).isValid, {
    message: "Invalid ISO string for Luxon DateTime",
  })
  .transform((value) => DateTime.fromISO(value))
