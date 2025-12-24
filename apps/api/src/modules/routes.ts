import express from "express";
const router = express.Router();

import playerRoutes from "@/modules/player/player.route.js"

router.use("/players", playerRoutes);

export default router;
