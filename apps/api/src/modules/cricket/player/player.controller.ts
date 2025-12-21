import { NextFunction, Request, Response } from "express";
import logger from "@/config/logger.js";

import { prisma } from "@lib/prisma.js";
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

    logger.info(`created cricketer: ${shortName}, aged ${age}, nationality ${cricketer.nationality.display}`);

    sendResponse(res, StatusCodes.CREATED, true, {
      "name": shortName,
      "age": age,
      "nationality": cricketer.nationality.display
    }, "Player created successfully.")
  } catch (err) {
    next(err);
  }
}
