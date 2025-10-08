import { FastifyTypedInstance } from "../../types/FastifyTypedInstance"
import { usersController, } from "../controllers/usersController"
import { createUserBodySchema, loginUserBodySchema, logoutSuccessResponseSchema, userResponseSchema } from "../schemas/usersSchemas"

export async function userRoutes(app: FastifyTypedInstance) {
    app.post('/register', {
        schema: {
            body: createUserBodySchema,
            response: {
                201: userResponseSchema
            }
        }
    }, usersController.registerUser)

    app.post('/login', {
        schema: {
            body: loginUserBodySchema,
            response: {
                201: userResponseSchema
            }
        }
    }, usersController.loginUser)

    app.post('/logout', {
        schema: {
            response: {
                200: logoutSuccessResponseSchema
            }
        }
    }, usersController.logoutUser)
}