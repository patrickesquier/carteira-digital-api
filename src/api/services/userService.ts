import 'dotenv/config'
import bcrypt from "bcrypt"
import { knexConnection } from "../../database/connection"

const INITIAL_BALANCE = 100

interface UserData {
    name: string
    email: string
    password_hash: string
}

interface LoginData {
    email: string
    password_hash: string
}

export const userService = {
    async registerUser(userData: UserData) {
        const { name, email, password_hash } = userData

        return knexConnection.transaction(async(trx) => {
            try {
                const hashedPassword = await bcrypt.hash(password_hash, parseInt(process.env.SALTROEUNDS ? process.env.SALTROEUNDS : '10'))

                const [newUser] = await trx('users')
                    .insert({
                        name,
                        email,
                        password_hash: hashedPassword,
                    })
                    .returning("id") 

                await trx("accounts").insert({
                    user_id: newUser.id,
                    balance: INITIAL_BALANCE
                })

                return {
                    id: String(newUser.id),
                    name,
                    email
                }
            } catch (error) {
                throw error
            }
        })
    },
    async loginUser(loginData: LoginData) {
        const { email, password_hash } = loginData

        return knexConnection.transaction(async(trx) => {
            try {
                const user = await trx('users').where({ email }).first()

                if (!user) {
                    throw new Error("Invalid credentials")
                }

                const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash)

                if (!isPasswordValid) {
                    throw new Error("Invalid credentials")
                }

                return {
                    id: String(user.id),
                    name: user.name,
                    email: user.email
                }
            } catch (error) {
                throw error
            }
        })
    }
}