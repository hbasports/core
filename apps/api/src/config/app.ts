import type { AppConfig } from "./type.js";

import dotenv from 'dotenv'
dotenv.config({path: './.env'});

export const config: AppConfig = {
    env: {
        type: (process.env.NODE_ENV as "development" | "production") ?? "production"
    },
    api: {
        port: Number(process.env.API_PORT) || 3001,
        url: process.env.API_URL ?? "",
    }
}