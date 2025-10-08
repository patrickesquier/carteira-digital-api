import { FastifyTypedInstance } from "../../types/FastifyTypedInstance"
import { accountController } from "../controllers/accountController"
import { accountResponseSchema } from "../schemas/accountSchemas"

export async function accountRoutes(app: FastifyTypedInstance) {
    app.get('/account', {
        schema: {
            response: {
                200: accountResponseSchema
            }
        }
    },accountController.getAccount)
}