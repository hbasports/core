import responseTime from 'response-time'
import { Request, Response } from 'express'

import logger from '@/config/logger.js'
import { StatusCodes } from 'http-status-codes'

import { v7 as uuidv7 } from 'uuid'

export default function logRequest() {
    return responseTime((req: Request, res: Response, time: number) => {
        const requestId = uuidv7()
        res.setHeader("Request-Id", requestId)

        const responseTime = `${(time / 1000).toFixed(2)}s`

        const {method, baseUrl} = req;

        logger.info(`${method} ${baseUrl} -> ${res.statusCode} ${StatusCodes[res.statusCode]} in ${responseTime} (${requestId})`)
    })
}