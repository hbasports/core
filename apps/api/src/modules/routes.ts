import express from "express";
const router = express.Router();

import playerRoutes from "@/modules/player/player.route.js"
import userRoutes from "@/modules/user/user.route.js"

router.use("/players", playerRoutes);
router.use("/users", userRoutes)

export default router;
