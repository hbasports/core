import express from 'express'
const router = express.Router()

import { PlayerController } from './player.controller.js'

router.post("/create", PlayerController.createUser)

export default router