import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { buildApp } from '../app'

describe('User API', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = buildApp() 
    await app.ready() 
  })

  afterAll(async () => {
    await app.close() 
  })

  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: '123456'
    }

    const response = await request(app.server)
      .post('/users')
      .send(newUser)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name', newUser.name)
    expect(response.body).toHaveProperty('email', newUser.email)
    expect(response.body).not.toHaveProperty('password_hash')
  })
})