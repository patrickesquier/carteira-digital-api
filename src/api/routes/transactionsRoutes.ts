import { FastifyTypedInstance } from "../../types/FastifyTypedInstance"
import { knexConnection } from "../../database/connection"
import { z } from "zod"

export async function transactionsRoutes(app: FastifyTypedInstance) {
    app.get('/transactions', async (req, reply) => {
        try {
            const userId = req.user.id

            const transactions = await knexConnection('transactions')
                .where({ sender_id: userId })
                .orWhere({ receiver_id: userId })
                .orderBy('created_at', 'desc')

            return reply.status(200).send(transactions)
        } catch (error) {
    }
}