import express from "express";
const router = express.Router();

import playerRoutes from "./player/player.route.js";
import teamRoutes from './team/team.route.js'
import venueRoutes from './venue/venue.route.js'

router.use("/players", playerRoutes);
router.use('/teams', teamRoutes)
router.use('/venues', venueRoutes)

export default router;