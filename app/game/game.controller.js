import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { gameSelectedFields } from '../utils/selectable-fields.utils.js'

/**
 * Gets a list of all games
 * @route GET /api/games
 * @access Private
 */
export const getAllGames = asyncHandler(async (_, res) => {
  try {
    const games = await prisma.game.findMany({
      orderBy: {
        id: 'asc'
      },
      select: gameSelectedFields
    })

    res.status(200).json(games)
  } catch (error) {
    res.status(400).json(error)
  }
})

/**
 * Gets the game by its ID
 * @route GET /api/games/:id
 * @access Private
 */
export const getGameById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body

    const game = await prisma.game.findFirst({
      where: {
        id
      },
      select: gameSelectedFields
    })

    res.status(200).json(game)
  } catch (error) {
    res.status(400).json(error)
  }
})

/**
 * Creates a game in the store
 * @route POST /api/games
 * @access Private
 */
export const createGame = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, categoryId, developerId } = req.body

    const createdGame = await prisma.game.create({
      data: {
        name,
        description,
        price,
        categoryId,
        developerId
      },
      select: gameSelectedFields
    })

    res.status(200).json(createdGame)
  } catch (error) {
    res.status(400).json(error)
  }
})

/**
 * Updates the game data
 * @route PATCH /api/games/:id
 * @access Private
 */
export const updateGameById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price, categoryId, developerId, releaseDate } =
      req.body

    const game = await prisma.game.update({
      where: {
        id: +id
      },
      data: {
        name,
        description,
        price,
        categoryId,
        developerId,
        releaseDate
      },
      select: gameSelectedFields
    })

    res.status(200).json(game)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

/**
 * Deletes the game
 * @route DELETE /api/games/:id
 * @access Private
 */
export const deleteGameById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    const gameToDelete = await prisma.game.findUnique({
      where: { id: +id }
    })

    if (!gameToDelete) {
      return res.status(200).json({ message: `Game with id ${id} not found.` })
    }

    const deletedGame = await prisma.game.delete({
      where: { id: +id },
      select: gameSelectedFields
    })

    res.status(200).json(deletedGame)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
