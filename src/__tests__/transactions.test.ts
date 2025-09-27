import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { buildApp } from '../app'

let validToken = 'seu token de autenticação válido aqui'

describe('Transaction API', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = buildApp(); 
    await app.ready(); 
  })

  afterAll(async () => {
    await app.close(); 
  })

  it('should create a new transaction', async () => {
    const newTransaction = {
      receiver_email: "john@example.com",
      amount: 10,
      description: "Primeiro Envio"
    }

    const response = await request(app.server)
      .post('/transactions')
      .set('Authorization', `Bearer ${validToken}`)
      .send(newTransaction)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'Transaction successful')
    
  })
})