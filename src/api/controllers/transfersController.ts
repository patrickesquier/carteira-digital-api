import { FastifyRequest, FastifyReply } from "fastify"
import { transfersService } from "../services/transfersService"
import { UserPayload } from "../schemas/usersSchemas"
import { CreateTransfersData } from "../schemas/transfersSchemas"

export const transfersController = {
    async createTransfers(request: FastifyRequest<{ Body: CreateTransfersData }>, reply: FastifyReply) {
        try {
            const sender_id = (request.user as UserPayload).id
            const { receiver_email, amount, description } = request.body

            await transfersService.createTransfers({
                senderUserId: sender_id,
                receiverEmail: receiver_email,
                amount,
                description
            })
            
            return reply.status(201).send({ message: 'Transaction successful' })
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Insufficient balance") {
                    return reply.status(400).send({ message: "Insufficient balance" })
                }
                if (error.message === "Recipient not found") {
                    return reply.status(404).send({ message: "Recipient not found" })
                }
                if (error.message === "Cannot transfer to yourself") {
                    return reply.status(400).send({ message: "Cannot transfer to yourself" })
                }
                if (error.message === "Sender account not found") {
                    return reply.status(500).send({ message: "System error: sender account missing" })
                }

                return reply.status(500).send({ message: error.message || "Internal server error" })
            }

            return reply.status(500).send({ message: 'Internal server error' })
        }
    }
}
