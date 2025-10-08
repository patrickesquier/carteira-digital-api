import { z } from "zod"

export const historyItemResponseSchema = z.object({
    id: z.union([z.number().int(), z.string()]).transform(val => String(val)), 
    sender_id: z.number().int(),
    receiver_id: z.number().int(),
    amount: z.string(), 
    description: z.string().nullable(), 
    created_at: z.union([z.date(), z.string()]).transform((val) => {
        if (val instanceof Date) {
            return val.toISOString();
        }
        return val
    }),
})

export const historyResponseSchema = z.array(historyItemResponseSchema)