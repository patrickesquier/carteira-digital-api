import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { transfersRoutes } from "./api/routes/transfersRoutes"
import { historyRoutes } from "./api/routes/historyRoutes"
import { accountRoutes } from "./api/routes/accountRoutes"
import { userRoutes } from "./api/routes/usersRoutes"
import fastifyJwt from "@fastify/jwt"
import fastifyCors from "@fastify/cors"
import Fastify from "fastify"
import "dotenv/config"

export function buildApp() {

  const JWT_SECRET = process.env.JWT_SECRET

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined.")
  }

  const app = Fastify({
    logger: false, 
  })

  app.register(fastifyCors, { origin: '*' })
  app.register(fastifyJwt, { 
    secret: JWT_SECRET
  })
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)
  app.register(userRoutes)

  app.register(async (protectedRoutes) => {
    protectedRoutes.addHook('onRequest', async (req, reply) => {
        try {
            await req.jwtVerify()
        } catch (err) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }
    })

    app.register(transfersRoutes)
    app.register(historyRoutes)
    app.register(accountRoutes)
  })

  return app
}

const app = buildApp();
export { app };

if (require.main === module) {
  app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server listening on ${address}`);
  });
}
