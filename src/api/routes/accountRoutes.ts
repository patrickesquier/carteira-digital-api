import { FastifyTypedInstance } from "../../types/FastifyTypedInstance"
import { accountController } from "../controllers/accountController"

export async function accountRoutes(app: FastifyTypedInstance) {
    app.get('/account', accountController.getAccount)
}