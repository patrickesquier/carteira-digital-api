import { FastifyRequest, FastifyReply } from "fastify"
import { historyService } from "../services/historyService"

interface UserPayload {
    id: string;
    email: string;
}

export const historyController = {
    async getTransfersHistory(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user_id = (request.user as UserPayload).id

            const transfers = await historyService.getTransfersHistory(user_id)

            return reply.status(200).send(transfers)
        } catch (error) {
            return reply.status(500).send({ message: "Internal server error" })
        }
    }
}