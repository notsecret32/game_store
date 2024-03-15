import express from 'express'

import { protect } from '../middleware/auth.middleware.js'
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById
} from './category.controller.js'

const router = express.Router()

// Route: /api/categories
router.route('/').get(protect, getAllCategories).post(protect, createCategory)

// Route: /api/categories/:id
router
  .route('/:id')
  .get(protect, getCategoryById)
  .put(protect, updateCategoryById)
  .delete(protect, deleteCategoryById)

export default router
