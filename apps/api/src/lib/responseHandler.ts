import { Response } from "express";

interface ResponseData {
  [key: string]: any;
}

export function sendResponse(
    res: Response,
    statusCode: number,
    success?: boolean,
    data: ResponseData | null = {},
    message?: string
): Response {
    const response = {
        statusCode,
        timestamp: new Date().toISOString(),
        success,
        data: data === null ? {} : data,
        message,
    }

    return res.status(statusCode).json(response)
}