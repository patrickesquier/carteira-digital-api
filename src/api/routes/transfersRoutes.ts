import { FastifyTypedInstance } from "../../types/FastifyTypedInstance"
import { transfersController } from "../controllers/transfersController"
import { transfersBodySchema, transferSuccessResponseSchema } from "../schemas/transfersSchemas"

export async function transfersRoutes(app: FastifyTypedInstance) {
    app.post('/transfers', {
        schema: { 
            body: transfersBodySchema, 
            response: {
                201: transferSuccessResponseSchema
            }
        }
    }, transfersController.createTransfers)
}



