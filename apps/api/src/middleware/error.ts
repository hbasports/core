import logger from "@/config/logger.js";
import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error(err.message)
    res.status(err.status || 500).json({
        errorCode: err.status, 
        message: err.message
    })
}