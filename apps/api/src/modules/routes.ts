import express from "express";
const router = express.Router();

import cricketRoutes from "@/modules/cricket/route.js";

router.use("/cricket", cricketRoutes);

export default router;
