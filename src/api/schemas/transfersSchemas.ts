import { z } from "zod"

export const transfersBodySchema = z.object({
    receiver_email: z.email(),
    amount: z.number().positive(),
    description: z.string().optional()
})

export const transferSuccessResponseSchema = z.object({
    message: z.string().default('Transaction successful.')
})

export interface CreateTransfersData  {
    senderUserId: string
    receiver_email: string
    amount: number
    description?: string
}