import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { generateToken } from '../utils/generate-token.utils.js'
import { userSelectedFields } from '../utils/user-select.utils.js'

/**
 * Auth user.
 * @route POST /api/auth/login
 * @access Public
 */
export const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  const isValidPassword = await verify(user.password, password)

  if (user && isValidPassword) {
    const token = generateToken(user.id)
    res.json({ user, token })
  } else {
    res.status(401)
    throw new Error('Username and password are not correct')
  }
})

/**
 * Register user.
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { username, password, role } = req.body

  const isUserExist = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (isUserExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await prisma.user.create({
    data: {
      username: username,
      password: await hash(password),
      role: role
    },
    select: userSelectedFields
  })

  const token = generateToken(user.id)

  res.json({ user, token })
})
