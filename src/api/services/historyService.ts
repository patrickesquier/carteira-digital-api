import { knexConnection } from "../../database/connection"

export const historyService = {
    async getTransfersHistory(userId: string) {
        const id = Number(userId) 
        
        const transfers = await knexConnection('transfers')
            .where({ sender_id: id })
            .orWhere({ receiver_id: id })
            .orderBy('created_at', 'desc')

        return transfers.map(transfer => {
            const formattedAmount = Number(transfer.amount).toFixed(2)

            return {
                ...transfer,
                amount: formattedAmount,
                id: String(transfer.id),
                sender_id: Number(transfer.sender_id),
                receiver_id: Number(transfer.receiver_id),
            }
        })
    }
}
