import { FastifyTypedInstance } from "../../types/FastifyTypedInstance"
import { usersController, } from "../controllers/usersController"
import { z } from "zod"

const createUserBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password_hash: z.string()
})

const loginUserBodySchema = z.object({
    email: z.email(),
    password_hash: z.string()
})

const useResposeSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string()
})

export async function userRoutes(app: FastifyTypedInstance) {
    app.post('/users', {
        schema: {
            body: createUserBodySchema,
            response: {
                201: useResposeSchema
            }
        }
    }, usersController.registerUser)

    app.post('/login', {
        schema: {
            body: loginUserBodySchema,
            response: {
                201: useResposeSchema
            }
        }
    }, usersController.loginUser)
}