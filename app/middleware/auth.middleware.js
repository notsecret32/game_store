import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'
import { userSelectedFields } from '../utils/selectable-fields.utils.js'

export const protect = asyncHandler(async (req, res, next) => {
  try {
    let token

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const userFound = await prisma.user.findUnique({
        where: {
          id: decoded.userId
        },
        select: userSelectedFields
      })

      if (!userFound) {
        res.status(401)
        throw new Error('Not authorized, token failed!')
      }

      console.log(userFound.role)

      if (userFound.role !== 'ADMIN') {
        res.status(401)
        throw new Error("You don't have enough rights for this action")
      }

      req.user = userFound
      next()
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, I do not have a token')
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
