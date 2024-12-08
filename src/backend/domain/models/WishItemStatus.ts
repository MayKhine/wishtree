import z from "zod"

export const wishItemStatusSchema = z.enum(["open", "reserved", "received"])

export type WishItemStatus = z.infer<typeof wishItemStatusSchema>
