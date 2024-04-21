import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { generateToken } from '../utils/generate-token.utils.js'
import { userSelectedFields } from '../utils/selectable-fields.utils.js'

/**
 * Auth user.
 * @route POST /api/auth/login
 * @access Public
 */
export const authUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      return res.status(400).json({ message: 'User not exists' })
    }

    const isValidPassword = await verify(user.password, password)

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: 'Username and password are not correct' })
    }

    const token = generateToken(user.id)
    res.cookie('token', token)
    res.status(200).json({ user, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

/**
 * Register user.
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, password, role } = req.body

    const isUserExist = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (isUserExist) {
      return res.status(400).json({ message: 'User already exists' })
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
    res.cookie('token', token)
    res.json({ user, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
