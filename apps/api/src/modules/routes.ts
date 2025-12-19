import express from "express";
const router = express.Router();

import cricketerRoutes from "./cricketers/cricketer.route.js";

router.use("/cricketers", cricketerRoutes);

export default router;
