import { Router } from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getAllReviews } from './review.controller.js'

const router = Router()

// Route: /api/reviews
router.route('/').get(protect, getAllReviews)

export default router
