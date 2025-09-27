import { FastifyTypedInstance } from "../../types/FastifyTypedInstance"
import { transfersController } from "../controllers/transfersController"
import { z } from "zod"

const transfersBodySchema = z.object({
    receiver_email: z.email(),
    amount: z.number().positive(),
    description: z.string().optional()
})

export async function transfersRoutes(app: FastifyTypedInstance) {
    app.post('/transfers', {
        schema: { body: transfersBodySchema }
    }, transfersController.createTransfers)
}



