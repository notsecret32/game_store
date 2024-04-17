import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { userSelectedFields } from '../utils/selectable-fields.utils.js'

/**
 * Get all users
 * @route GET /api/users
 * @access private
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    select: userSelectedFields,
    orderBy: {
      id: 'asc'
    }
  })

  res.json(users)
})

/**
 * Get user by Id
 * @route GET /api/users/:id
 * @access Private
 */
export const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      select: userSelectedFields,
      where: {
        id: +req.params.id
      }
    })

    res.json(user)
  } catch (error) {
    res.status(404)
    throw new Error('User not found!')
  }
})

/**
 * Update user by Id
 * @route PUT /api/users/:id
 * @access Private
 */
// TODO: Добавить изменение password и role в зависимости от того, кто зарегистрирован
export const updateUser = asyncHandler(async (req, res) => {
  const { username } = req.body
  try {
    const user = await prisma.user.update({
      select: userSelectedFields,
      where: {
        id: +req.params.id
      },
      data: {
        username
      }
    })

    res.json(user)
  } catch (error) {
    res.status(404)
    throw new Error('User not found!')
  }
})

/**
 * Delete user by Id
 * @route DELETE /api/users/:id
 * @access Private
 */
export const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const user = await prisma.user.delete({
      select: userSelectedFields,
      where: {
        id: +req.params.id
      }
    })

    res.json({ message: 'User deleted!', user })
  } catch (error) {
    res.status(404)
    throw new Error('User not found')
  }
})
