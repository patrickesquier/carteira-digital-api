import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { buildApp } from '../app'

let validToken = 'seu token de autenticação válido aqui'

describe('History API', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = buildApp(); 
    await app.ready(); 
  })

  afterAll(async () => {
    await app.close(); 
  })

  it('should get history of transtions', async () => {

    const response = await request(app.server)
      .get('/transactions')
      .set('Authorization', `Bearer ${validToken}`)

    expect(response.status).toBe(200)
  })
})