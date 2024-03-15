import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import authRouter from './app/auth/auth.routes.js'
import categoryRouter from './app/category/category.routes.js'
import developerRouter from './app/developer/developer.routes.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import { prisma } from './app/prisma.js'

dotenv.config()

const app = express()

async function main() {
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

  app.use(cors())
  app.use(express.json())

  app.use('/api/auth', authRouter)
  app.use('/api/developers', developerRouter)
  app.use('/api/categories', categoryRouter)

  app.use(notFound)
  app.use(errorHandler)

  const PORT = process.env.PORT || 5000

  app.listen(
    PORT,
    console.log(`NODE ENV: ${process.env.NODE_ENV} | http://localhost:${PORT}`)
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
