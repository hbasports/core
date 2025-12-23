import { prisma } from '@hbasports/prisma/client'
import { sendResponse } from '@/lib/responseHandler.js'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

export async function createVenue(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const venue = await prisma.cricketVenue.create({
            "data": req.body
        })

        sendResponse(res, StatusCodes.CREATED, true, { "name": venue.name, "location": venue ? `${venue.suburb ? venue.suburb + ", " : ""}${venue.city}` : "", }, "Created venue successfully.")
    } catch (err) {
        next(err)
    }
}