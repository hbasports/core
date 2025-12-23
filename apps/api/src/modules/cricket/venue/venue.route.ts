import express from "express"
const router = express.Router()

import { createVenue } from "./venue.controller.js"
import { validateData } from "@/middleware/body/json.validation.middleware.js"
import { CricketVenueCreateInputObjectZodSchema } from "@hbasports/prisma/objects/CricketVenueCreateInput.schema.js"

router.post('/new', validateData(CricketVenueCreateInputObjectZodSchema), createVenue)

export default router