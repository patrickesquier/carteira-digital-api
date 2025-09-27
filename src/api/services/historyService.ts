import { knexConnection } from "../../database/connection"

export const historyService = {
    async getTransfersHistory(userId: string) {
        return knexConnection('transfers')
            .where({ sender_id: userId })
            .orWhere({ receiver_id: userId })
            .orderBy('created_at', 'desc')
    }
}