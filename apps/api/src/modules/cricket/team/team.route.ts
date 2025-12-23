import express from "express"
const router = express.Router()

import { createTeam } from "./team.controller.js"
import { validateData } from "@/middleware/body/json.validation.middleware.js"
import { CricketTeamCreateInputObjectZodSchema } from "@hbasports/prisma/objects/CricketTeamCreateInput.schema.js"

router.post('/new', validateData(CricketTeamCreateInputObjectZodSchema.omit({teamId: true})), createTeam)

export default router