import { knexConnection } from "../../database/connection"

export const accountService = {
    async getAccountBalance(userId: string) {
        const account = await knexConnection('accounts')
            .select('balance')
            .where({ user_id: userId })
            .first()
            .forUpdate()

        const currentBalance = account ? account.balance : 0

        return currentBalance
    }
}