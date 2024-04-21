import express from 'express'

import { protect } from '../middleware/auth.middleware.js'
import {
  createDeveloper,
  deleteDeveloperById,
  getAllDevelopers,
  getDeveloperById,
  updateDeveloperById
} from './developer.controller.js'

const router = express.Router()

// Route: /api/developers
router.route('/').get(getAllDevelopers).post(protect, createDeveloper)

// Route: /api/developers/:id
router
  .route('/:id')
  .get(getDeveloperById)
  .put(protect, updateDeveloperById)
  .delete(protect, deleteDeveloperById)

export default router
