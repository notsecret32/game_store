import express from 'express'

import { protect } from '../middleware/auth.middleware.js'
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById
} from './user.controller.js'

const router = express.Router()

// Route: /api/users
router.route('/').get(protect, getAllUsers)

// Route: /api/users/:id
router
  .route('/:id')
  .get(protect, getUserById)
  .put(protect, updateUser)
  .delete(protect, deleteUserById)

export default router
