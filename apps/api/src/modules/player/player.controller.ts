import { Request, Response, NextFunction } from "express";
import { PlayerCreationService } from "@hbasports/features/player/services/PlayerCreationService.js";
import { sendResponse } from  "@/lib/responseHandler.js";
import { StatusCodes } from "http-status-codes";

export class PlayerController {
  static async createPlayer(req: Request, res: Response, next: NextFunction) {
    try {
      const player = await PlayerCreationService.createPlayer(req.body);
      sendResponse(
        res,
        StatusCodes.CREATED,
        player,
        "Player created successfully."
      );
    } catch (err) {
      next(err);
    }
  }

  static async getPlayerById(req: Request, res: Response, next: NextFunction) {
    try {
      const playerId = req.params.id;
      const player = await PlayerCreationService.getPlayerById(playerId);
      sendResponse(
        res,
        StatusCodes.OK,
        player,
        "Player retrieved successfully."
      );
    } catch (err) {
      next(err);
    }
  }
}
