import express from 'express'
const router = express.Router()

import { PlayerController } from './player.controller.js'

router.post("/create", PlayerController.createPlayer)
router.get("/:id", PlayerController.getPlayerById)

export default router