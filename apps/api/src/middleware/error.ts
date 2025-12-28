import logger from "@/config/logger.js";

import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@hbasports/prisma/internal/prismaNamespace.js";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

interface ErrorResponse {
  errorCode: number;
  message: string;
  timestamp: Date;
  errors?: Record<string, string>;
}

const DEFAULT_MESSAGE = "Something went wrong! Please try again later.";

const SIGNUP_ERROR_MESSAGES: Record<string, string> = {
  email: "This email is already registered.",
  slug: "This username is already taken.", // The slug is derived from username
  username: "This username is already taken.",
};

function extractFieldFromPrismaError(field: string): string | null {
  const match = field.match(/^[^_]+_(.+)_key$/);
  return match ? match[1] : field;
}

export default function errorHandler(
  err: Error & { status: number },
  req: Request,
  res: Response,
  next: NextFunction
): Response<ErrorResponse> {
  logger.error(err.message);

  const timestamp = new Date();

  if (err instanceof ZodError) {
    const errors: Record<string, string> = {};
    err.issues.forEach((e) => {
      const path = e.path.join(".");
      errors[path] = e.message;
    });

    const response: ErrorResponse = {
      errorCode: StatusCodes.BAD_REQUEST,
      message: "Validation error",
      timestamp,
      errors,
    };

    return res.status(response.errorCode).json(response);
  }

  if (err instanceof PrismaClientInitializationError) {
    const response: ErrorResponse = {
      errorCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: DEFAULT_MESSAGE,
      timestamp,
    };

    logger.error(`CRITICAL: Prisma error: ${err.message}`);

    return res.status(response.errorCode).json(response);
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = err.meta?.target as string[] | undefined;

      let fields: string[] = [];

      if (Array.isArray(target)) {
        fields = target;
      } else {
        fields = [target as unknown as string];
      }

      const errors: Record<string, string> = {};
      fields.forEach((field) => {
        const extractedField = extractFieldFromPrismaError(field);
        errors[extractedField || "unknown"] = SIGNUP_ERROR_MESSAGES[extractedField as string] ||"This value is already taken.";
      });

      const response: ErrorResponse = {
        errorCode: StatusCodes.CONFLICT,
        message: "Body request resulted in a conflict.",
        timestamp,
        errors,
      };

      return res.status(response.errorCode).json(response);
    }

    const response: ErrorResponse = {
      errorCode: StatusCodes.UNPROCESSABLE_ENTITY,
      message: DEFAULT_MESSAGE,
      timestamp,
    };

    return res.status(response.errorCode).json(response);
  }

  if (err instanceof PrismaClientUnknownRequestError) {
    const response: ErrorResponse = {
      errorCode: StatusCodes.CONFLICT,
      message: DEFAULT_MESSAGE,
      timestamp,
    };

    return res.status(response.errorCode).json(response);
  }

  const response: ErrorResponse = {
    errorCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Internal Server Error",
    timestamp,
  };

  return res
    .status(err.status || response.errorCode)
    .json(response);
}
