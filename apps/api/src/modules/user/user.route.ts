import express from 'express'
const router = express.Router()

import { UserController } from './user.controller.js'

router.post("/create", UserController.create)

export default router