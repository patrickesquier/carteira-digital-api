import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { transfersRoutes } from "../routes/transfersRoutes"
import { accountRoutes } from "../routes/accountRoutes"
import { historyRoutes } from "../routes/historyRoutes"
import { userRoutes } from "../routes/usersRoutes"

const allRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
    app.register(userRoutes)

    app.register(async (protectedRoutes) => {
        protectedRoutes.addHook('onRequest', async (req, reply) => {
            try {
                await req.jwtVerify()
            } catch (err) {
                return reply.status(401).send({ message: 'Unauthorized' })
            }
        })

        protectedRoutes.register(transfersRoutes)
        protectedRoutes.register(accountRoutes)
        protectedRoutes.register(historyRoutes)
    })

}

export default allRoutes