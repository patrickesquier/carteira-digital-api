import { knexConnection } from "../../database/connection"

interface CreateTransfersData  {
    senderUserId: string
    receiverEmail: string
    amount: number
    description?: string
}

export const transfersService = {
    async createTransfers(createTransfersData: CreateTransfersData) {
        const { senderUserId, receiverEmail, amount, description } = createTransfersData

        return knexConnection.transaction(async(trx) => {

            const sender = await trx('users').where({ id: senderUserId }).first()
            const recipient = await trx('users')
                .where({ email: receiverEmail })
                .join('accounts', 'users.id', '=', 'accounts.user_id')
                .select('accounts.*')
                .first()

            if (!sender || !recipient) {
                throw new Error('Sender or recipient not found')
            }

            if (sender.balance < amount) {
                throw new Error('Insufficient funds')
            }

            if(sender.id === recipient.user_id) {
                throw new Error('Cannot transfer to yourself')
            }

            await trx('accounts').where({ user_id: sender.id }).decrement('balance', amount)
            await trx('accounts').where({ id: recipient.id }).increment('balance', amount)
            await trx('transfers').insert({
                sender_id: sender.id,
                receiver_id: recipient.user_id,
                amount,
                description
            })
        })
    },
}