import express from 'express'

import { protect } from '../middleware/auth.middleware.js'
import {
  createDeveloper,
  getAllDevelopers,
  getDeveloperById,
  updateDeveloperById,
  deleteDeveloperById
} from './developer.controller.js'

const router = express.Router()

// Route: /api/developers
router.route('/').get(protect, getAllDevelopers).post(protect, createDeveloper)

// Route: /api/developers/:id
router
  .route('/:id')
  .get(protect, getDeveloperById)
  .put(protect, updateDeveloperById)
  .delete(protect, deleteDeveloperById)

export default router
