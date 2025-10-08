import { FastifyRequest, FastifyReply } from "fastify"
import { userService } from "../services/userService"
import { LoginUserBody, RegisterUserBody } from "../schemas/usersSchemas"

export const usersController = {
    async registerUser(request: FastifyRequest<{ Body: RegisterUserBody }>, reply: FastifyReply) {
        try {
            const { name, email, password_hash } = request.body

            const newUser = await userService.registerUser({ name, email, password_hash })
            
            return reply.status(201).send(newUser)
        } catch (error: any) {
            if (error.code === '23505') {
                return reply.status(409).send({ message: 'Email already in use' })
            } 

            return reply.status(500).send({ message: 'Internal server error' })
        }
    },
    async loginUser(request: FastifyRequest<{ Body: LoginUserBody }>, reply: FastifyReply) {
        try {
            const { email, password_hash } = request.body

            const user = await userService.loginUser({ email, password_hash })

            const token = await reply.jwtSign({
                id: user.id,
                email: user.email
            })

            reply.setCookie('auth_token', token, {
                httpOnly: true, 
                secure: false,   
                sameSite: 'lax',
                path: '/',
                maxAge: 3600000 
            }).status(200).send({ message: 'Login successful' })

        } catch (error) {
             if (error instanceof Error) {
                if (error.message === "Invalid credentials") {
                    return reply.status(401).send({ message: 'Invalid credentials' })
                }
            }

            return reply.status(500).send({ message: 'Internal server error' })
        }
    },
    async logoutUser(request: FastifyRequest, reply: FastifyReply) {
        try {
            reply.clearCookie('auth_token', {
                secure: false,
                sameSite: 'lax',
                path: '/',
            })

            return reply.status(200).send({ message: 'Logout successful' })
        } catch (error) {
            return reply.status(500).send({ message: 'Internal server error' })
        }
    }
}