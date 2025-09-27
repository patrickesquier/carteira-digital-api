import { FastifyTypedInstance } from "../../types/FastifyTypedInstance"
import { historyController } from "../controllers/historyController";

export async function historyRoutes(app: FastifyTypedInstance) {
    app.get('/history', historyController.getTransfersHistory)
}



