import { Request, Response, NextFunction } from "express";

import { UserService } from "@hbasports/features/users/UserService.js";
import { asyncHandler } from "@/lib/asyncHandler.js";
import { sendResponse } from "@/lib/responseHandler.js";
export class UserController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.createUser(req.body);
    return sendResponse(
      res,
      201,
      { message: "test_data" },
      "User created successfully."
    );
  });
}
