import { NextFunction, Request, response, Response } from "express";
import logger from "@/config/logger.js";

import { prisma } from "@hbasports/prisma/client";
import { getAge } from "@lib/date.js";
import { sendResponse } from "@/lib/responseHandler.js";
import { StatusCodes } from "http-status-codes";
import { getShortName } from "@/lib/name/name.js";

export async function addPlayer(req: Request, res: Response, next: NextFunction) {
  try {
    const cricketer = await prisma.cricketer.create({
      data: req.body,
    });

    const shortName = getShortName(cricketer.fullName)
    const age = getAge(cricketer.born.date);

    const responseData = {
      "name": shortName,
      "age": age,
      "nationality": cricketer.nationality.display
    }

    logger.info("created cricketer", responseData);
    sendResponse(res, StatusCodes.CREATED, true, responseData, "Player created successfully.")
  } catch (err) {
    next(err);
  }
}
