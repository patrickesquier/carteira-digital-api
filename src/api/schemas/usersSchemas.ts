import { z } from "zod"

export const createUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password_hash: z.string()
})

export const loginUserBodySchema = z.object({
    email: z.email(),
    password_hash: z.string()
})

export const userResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string()
})

export const logoutSuccessResponseSchema = z.object({
    message: z.string().default('Logout successful.')
})

export type RegisterUserBody = z.infer<typeof createUserBodySchema>
export type LoginUserBody = z.infer<typeof loginUserBodySchema>
export type UserResponse = z.infer<typeof userResponseSchema>

export interface UserPayload {
    id: string 
    email: string
}