import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
  createGame,
  deleteGameById,
  getAllGames,
  getGameById,
  updateGameById
} from './game.controller.js'
import {
  addReview,
  deleteReview,
  getAllReviews,
  updateReview
} from './review/review.controller.js'

const router = Router()

// Route: /api/games
router.route('/').get(getAllGames).post(protect, createGame)

// Route: /api/games/:id
router
  .route('/:id')
  .get(getGameById)
  .patch(protect, updateGameById)
  .delete(protect, deleteGameById)

// Route: /api/games/:id/reviews
router
  .route('/:id/reviews')
  .get(getAllReviews)
  .post(protect, addReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview)

export default router
