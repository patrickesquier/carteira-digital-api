import { FastifyRequest, FastifyReply } from "fastify"
import { accountService } from "../services/accountService"
import { UserPayload } from "../schemas/usersSchemas"

export const accountController = {
    async getAccount(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = request.user as UserPayload
            const user_id = user.id

            const currentBalance = await accountService.getAccountBalance(user_id)

            return reply.status(200).send({ user: user, balance: currentBalance })
        } catch (error) {
            return reply.status(500).send({ message: "Internal server error" })
        }
    }
}