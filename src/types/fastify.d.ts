import { JWTPayload } from "@fastify/jwt"

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string
      email: string
    }
  }
}