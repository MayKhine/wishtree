import z from "zod"
import { LuxonDateTimeSchema } from "../../utils/LuxonDateTimeSchema"

export const upsertUserDataRequest = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  birthday: LuxonDateTimeSchema.optional(),
  about: z.string().optional(),
  facebook: z.string().optional(),
})

export type UpserUserDataRequest = z.infer<typeof upsertUserDataRequest>
