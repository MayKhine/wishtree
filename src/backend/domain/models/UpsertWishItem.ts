import z from "zod"

export const upsertWishItemRequest = z.object({
  id: z.string(),
  name: z.string(),
  notes: z.string(),
  price: z.number(),
  link: z.string(),
  imageUrl: z.string(),
  status: z.string(),
  mostWanted: z.boolean(),
  quantity: z.number(),
  wishListId: z.string(),
})

export type UpsertWishItemRequest = z.infer<typeof upsertWishItemRequest>
