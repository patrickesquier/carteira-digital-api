import { FastifyTypedInstance } from "../../types/FastifyTypedInstance"
import { historyController } from "../controllers/historyController"
import { historyResponseSchema } from "../schemas/historySchemas"

export async function historyRoutes(app: FastifyTypedInstance) {
    app.get('/history', {
        schema: {
            response: {
                200: historyResponseSchema
            }
        }
    }, historyController.getTransfersHistory)
}
