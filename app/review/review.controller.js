import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

/**
 * Gets a list of all reviews
 * @route GET /api/games/:id
 * @access Private
 */
export const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const addedReview = await prisma.review.findMany({
      orderBy: {
        id: 'asc'
      }
    })

    res.status(200).json(addedReview)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
