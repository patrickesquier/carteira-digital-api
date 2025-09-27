import { FastifyTypedInstance } from "../../types/FastifyTypedInstance"

interface UserPayload {
    id: string;
    email: string;
}

export async function profileRoutes(app: FastifyTypedInstance) {
    app.get('/profile', async (req, reply) => {
        const user = req.user as UserPayload;
        return reply.send({ message: 'This is a protected profile route', user: user })
    })
}