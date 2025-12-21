import responseTime from 'response-time'
import { Request, Response } from 'express'

import logger from '@/config/logger.js'
import { StatusCodes } from 'http-status-codes'

import { v7 as uuidv7 } from 'uuid'

export default function logRequest() {
    return responseTime((req: Request, res: Response, time: number) => {
        const requestId = uuidv7()
        res.setHeader("Request-Id", requestId)

        const {method, headers, body: requestBody, baseUrl} = req;

        logger.info("Incoming Request", {
            requestId,
            method,
            responseTime: `${(time / 1000).toFixed(2)}s`,
            url: baseUrl,
            timestamp: new Date().toISOString()
        })
    })
}