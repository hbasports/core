export const WEB_PORT = (process.env.WEB_PORT || 3000) as number;
export const API_PORT = (process.env.API_PORT || 3001) as number;

const BASE_URL = `http://localhost:${WEB_PORT}` || `http://localhost:3000`;

export const HBASPORTS_ENV = process.env.NODE_ENV;
export const IS_DEV = HBASPORTS_ENV !== "production";

export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBAPP_URL || BASE_URL;
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "HBA Sports";
export const COMPANY_NAME =
  process.env.NEXT_PUBLIC_COMPANY_NAME || "HBA Sports, Inc.";

export const AVATAR_FALLBACK = "/avatar.svg";

export const IS_PRODUCTION = HBASPORTS_ENV === "development";
