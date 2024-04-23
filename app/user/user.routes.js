import express from 'express'

import { protect } from '../middleware/auth.middleware.js'
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUser
} from './user.controller.js'

const router = express.Router()

// Route: /api/users
router.route('/').get(getAllUsers)

// Route: /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(protect, updateUser)
  .delete(protect, deleteUserById)

export default router
