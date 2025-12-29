import express from "express";
const router = express.Router();

import playerRoutes from "@/modules/player/player.route.js"
import userRoutes from "@/modules/auth/auth.route.js"

router.use("/players", playerRoutes);
router.use("/auth", userRoutes)

export default router;
