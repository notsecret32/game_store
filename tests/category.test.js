import { describe, it } from 'mocha'
import request from 'supertest'
import { prisma } from '../app/prisma.js'
import { app } from '../server.js'

describe('Category', () => {
  const register = '/api/auth/register'
  const api = '/api/categories'

  const name = 'Test Category'

  const username = 'test'
  const password = 'test'

  let token

  it('create', async () => {
    const res = await request(app)
      .post(register)
      .send({ username, password })
      .expect(200)

    token = res.cookie['token']

    await request(app)
      .post(api)
      .set('Bearer', token)
      .send({ name })
      .expect(name)
  })

  it('get all', async () => {
    const allCategories = await prisma.category.findMany()
    await request(app).get(api).expect(allCategories)
  })

  it('get by id', async () => {
    const category = await prisma.category.findFirst({
      where: {
        name
      }
    })

    await request(app).get(`${api}/${category.id}`).expect(category)
  })

  it('update', async () => {})

  it('delete', async () => {})
})
