import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import {
  gameSelectedFields,
  reviewSelectedFields
} from '../../utils/selectable-fields.utils.js'

/**
 * Adds a review to the game
 * @route Post /api/games/:id/reviews
 * @access Private
 */
export const addReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const { review, liked } = req.body
    const userId = req.user.id

    const userReview = await prisma.review.findFirst({
      where: {
        AND: {
          gameId: +id,
          userId
        }
      }
    })

    if (userReview) {
      return res
        .status(400)
        .json({ message: "You can't leave two reviews for one game" })
    }

    const addedReview = await prisma.review.create({
      data: {
        gameId: +id,
        userId: userId,
        review,
        liked
      },
      select: reviewSelectedFields
    })

    res.status(200).json(addedReview)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

/**
 * Gets a list of all reviews for a specific game
 * @route GET /api/games/:id/reviews
 * @access Private
 */
export const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    const reviews = await prisma.game.findMany({
      where: {
        id: +id
      },
      select: gameSelectedFields
    })

    res.status(200).json(reviews)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

/**
 * Updates the review data
 * @route PATCH /api/games/:id/reviews
 * @access Private
 */
export const updateReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const { review, liked } = req.body

    const userReview = await prisma.review.findFirst({
      where: {
        gameId: +id,
        userId: +req.user.id
      }
    })

    if (!userReview) {
      return res
        .status(200)
        .json({ message: 'The user did not leave a review about this game.' })
    }

    const reviewToUpdate = await prisma.review.update({
      where: {
        id: userReview.id
      },
      data: {
        review,
        liked
      }
    })

    res.status(200).json(reviewToUpdate)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

/**
 * Deletes the review
 * @route PATCH /api/games/:id/reviews
 * @access Private
 */
export const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    const userReview = await prisma.review.findFirst({
      where: {
        gameId: +id,
        userId: +req.user.id
      }
    })

    if (!userReview) {
      return res
        .status(200)
        .json({ message: 'The user did not leave a review about this game.' })
    }

    const review = await prisma.review.delete({
      where: {
        id: userReview.id
      }
    })

    res.status(200).json(review)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
