import express from "express";
const router = express.Router();

import { addCricketer } from "./cricketer.controller.js";

router.post("/new", addCricketer);

export default router;
