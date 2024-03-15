import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

/**
 * Create new developer
 * @route POST /api/developers
 * @access Private
 */
export const createDeveloper = asyncHandler(async (req, res) => {
  const { name } = req.body

  const developer = await prisma.developer.create({
    data: {
      name
    }
  })

  res.json(developer)
})

/**
 * Get all developers
 * @route GET /api/developers
 * @access private
 */
export const getAllDevelopers = asyncHandler(async (req, res) => {
  const developers = await prisma.developer.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  res.json(developers)
})

/**
 * Get developer by Id
 * @route GET /api/developers/:id
 * @access Private
 */
export const getDeveloperById = asyncHandler(async (req, res) => {
  try {
    const developer = await prisma.developer.findUnique({
      where: {
        id: +req.params.id
      }
    })

    res.json({ developer })
  } catch (error) {
    res.status(404)
    throw new Error('Developer not found!')
  }
})

/**
 * Update developer by Id
 * @route PUT /api/developers/:id
 * @access Private
 */
export const updateDeveloperById = asyncHandler(async (req, res) => {
  const { name } = req.body

  try {
    const developer = await prisma.developer.update({
      where: {
        id: +req.params.id
      },
      data: {
        name
      }
    })

    res.json(developer)
  } catch (error) {
    res.status(404)
    throw new Error('Developer not found!')
  }
})

/**
 * Delete developer by Id
 * @route DELETE /api/developers/:id
 * @access Private
 */
export const deleteDeveloperById = asyncHandler(async (req, res) => {
  try {
    const developer = await prisma.developer.delete({
      where: {
        id: +req.params.id
      }
    })

    res.json({ message: 'Developer deleted!', developer })
  } catch (error) {
    res.status(404)
    throw new Error('Developer not found')
  }
})
