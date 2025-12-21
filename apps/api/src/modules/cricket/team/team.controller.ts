import { NextFunction, Request, Response } from "express";
import logger from "@/config/logger.js";
import { sendResponse } from "@/lib/responseHandler.js";
import { StatusCodes } from "http-status-codes";

import { prisma } from '@/lib/prisma.js'

import { v7 as uuidv7 } from "uuid";

export async function createTeam(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const teamId = uuidv7()
        const team = await prisma.cricketTeam.create({
            data: {
                teamId: teamId,
                ...req.body
            }
        })

        sendResponse(res, StatusCodes.CREATED, true, {
            "name": team.displayName,
            "abbreviation": team.abbreviation,
            "teamId": team.teamId
        }, "Created team successfully.")
    } catch (err) {
        next(err)
    }
}