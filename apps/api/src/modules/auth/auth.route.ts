import express from 'express'
const router = express.Router()

import { UserController } from './auth.controller.js'

router.post("/signup", UserController.create)

export default router