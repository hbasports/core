import { Request, Response, NextFunction } from "express";
import { PlayerCreationService } from "@hbasports/features/player/services/PlayerCreationService.js";
import { sendResponse } from "@/lib/responseHandler.js";
import { StatusCodes } from "http-status-codes";

export class PlayerController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await PlayerCreationService.createPlayer(req.body);
      sendResponse(res, StatusCodes.CREATED, true, user, "Player created successfully.")
    } catch (err) {
      next(err);
    }
  }
}
