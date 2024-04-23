import { describe, it } from 'mocha'
import request from 'supertest'
import { app } from '../server.js'

describe('User Authentication', () => {
  const api = '/api/auth'

  const username = 'test'
  const password = 'test'

  it('registration', async () => {
    await request(app)
      .post(`${api}/register`)
      .set('Accept', 'application/json')
      .send({ username, password })
      .expect(200)
  })

  it('login', async () => {
    await request(app)
      .post(`${api}/login`)
      .set('Accept', 'application/json')
      .send({ username, password })
      .expect(200)
  })
})
