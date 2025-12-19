import { NextFunction, Request, Response } from "express";
import logger from "../../config/logger.js";

import { prisma } from "@lib/prisma.js";
import { getAge } from "@lib/date.js";

export async function addCricketer(req: Request, res: Response, next: NextFunction) {
  try {
    const cricketer = await prisma.cricketer.create({
      data: req.body,
    });

    const {
      fullName: { firstName, middleName, lastName },
      born,
      nationality,
    } = cricketer;

    const displayName = [firstName.preferred ?? firstName.legal, middleName, lastName].filter(Boolean).join(" ");

    const age = getAge(born.date);

    logger.info(`created cricketer: ${displayName}, aged ${age}, nationality ${nationality.display}`);

    res.status(201).json(cricketer);
  } catch (err) {
    next(err);
  }
}
