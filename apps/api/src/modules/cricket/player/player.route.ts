import express from "express";
const router = express.Router();

import { addPlayer } from "./player.controller.js";
import { validateData } from "@/middleware/body/json.validation.middleware.js";

import { CricketerCreateInputObjectZodSchema } from '@hbasports/prisma/objects/CricketerCreateInput.schema.js'

router.post("/new", validateData(CricketerCreateInputObjectZodSchema), addPlayer);

export default router;