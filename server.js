import cookie from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import authRouter from './app/auth/auth.routes.js'
import categoryRouter from './app/category/category.routes.js'
import developerRouter from './app/developer/developer.routes.js'
import gameRouter from './app/game/game.routes.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import { prisma } from './app/prisma.js'
import reviewRouter from './app/review/review.routes.js'
import userRouter from './app/user/user.routes.js'

dotenv.config()

const app = express()

async function main() {
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

  app.use(cors())
  app.use(express.json())
  app.use(cookie())

  app.use('/api/auth', authRouter)
  app.use('/api/games', gameRouter)
  app.use('/api/reviews', reviewRouter)
  app.use('/api/developers', developerRouter)
  app.use('/api/categories', categoryRouter)
  app.use('/api/users', userRouter)

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

export { app }
