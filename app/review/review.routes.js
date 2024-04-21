import { Router } from 'express'
import { getAllReviews } from './review.controller.js'

const router = Router()

// Route: /api/reviews
router.route('/').get(getAllReviews)

export default router
