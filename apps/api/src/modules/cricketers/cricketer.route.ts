import express from "express";
const router = express.Router();

import { addCricketer } from "./cricketer.controller.js";
import { validateData } from "@/middleware/validation.js";

import { CricketerCreateInputObjectSchema } from "@/prisma/generated/schemas/objects/CricketerCreateInput.schema.js";

router.post("/new", validateData(CricketerCreateInputObjectSchema), addCricketer);

export default router;