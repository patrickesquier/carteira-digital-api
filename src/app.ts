import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import fastifyCookie from '@fastify/cookie' 
import fastifyJwt from "@fastify/jwt"
import fastifyCors from "@fastify/cors"
import allRoutes from "./api/routes"
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
    
    app.register(fastifyCookie) 

    app.register(fastifyJwt, { 
        secret: JWT_SECRET,
        cookie: {
            cookieName: 'auth_token', 
            signed: false,
        }
    })

    app.setValidatorCompiler(validatorCompiler)
    app.setSerializerCompiler(serializerCompiler)

    app.register(allRoutes)
    
    return app
}

const app = buildApp()
export { app }

if (require.main === module) {
    app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log(`Server listening on ${address}`)
    })
}
