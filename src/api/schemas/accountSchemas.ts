import { z } from "zod"

export const userProfileSchema = z.object({
    id: z.string(),
    email: z.email(),
    iat: z.number().int().optional()
})

export const accountResponseSchema = z.object({
    user: userProfileSchema,
    balance: z.string().regex(/^\d+(\.\d{2})?$/, 'Invalid balance format.'), 
})