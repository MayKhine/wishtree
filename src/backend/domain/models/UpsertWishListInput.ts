import z from "zod"
import { LuxonDateTimeSchema } from "../../utils/LuxonDateTimeSchema"

export const upsertWishListSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  eventDate: LuxonDateTimeSchema.optional(),
})

export type UpsertWishListRequest = z.infer<typeof upsertWishListSchema>
