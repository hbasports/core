export enum AUTH_CODES {
  INTERNAL_SERVER_ERROR = "internal-server-error",
  PROVIDER_NOT_SUPPORTED = "provider-not-supported",
  SUCCESS = "success",
  METHOD_NOT_SUPPORTED = "request-method-not-supported",
}

export const AUTH_MESSAGES: Record<AUTH_CODES, string> = {
  [AUTH_CODES.INTERNAL_SERVER_ERROR]: "An unexpected error occurred.",
  [AUTH_CODES.PROVIDER_NOT_SUPPORTED]:
    "The requested authentication provider is not supported.",
  [AUTH_CODES.SUCCESS]:
    "Authentication with requested provider was completed successfully.",
  [AUTH_CODES.METHOD_NOT_SUPPORTED]:
    "HTTP method used is not supported. Only POST and GET is supported.",
};
