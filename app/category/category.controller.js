import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

/**
 * Create new category
 * @route POST /api/categories
 * @access Private
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body

  const category = await prisma.category.create({
    data: {
      name
    }
  })

  res.json(category)
})

/**
 * Get all categories
 * @route GET /api/categories
 * @access private
 */
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: 'asc'
    }
  })

  res.json(categories)
})

/**
 * Get category by Id
 * @route GET /api/categories/:id
 * @access Private
 */
export const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: +req.params.id
      }
    })

    res.json(category)
  } catch (error) {
    res.status(404)
    throw new Error('Category not found!')
  }
})

/**
 * Update category by Id
 * @route PUT /api/categories/:id
 * @access Private
 */
export const updateCategoryById = asyncHandler(async (req, res) => {
  const { name } = req.body

  try {
    const category = await prisma.category.update({
      where: {
        id: +req.params.id
      },
      data: {
        name
      }
    })

    res.json(category)
  } catch (error) {
    res.status(404)
    throw new Error('Category not found!')
  }
})

/**
 * Delete category by Id
 * @route DELETE /api/categories/:id
 * @access Private
 */
export const deleteCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await prisma.category.delete({
      where: {
        id: +req.params.id
      }
    })

    res.json({ message: 'Category deleted!', category })
  } catch (error) {
    res.status(404)
    throw new Error('Category not found')
  }
})
