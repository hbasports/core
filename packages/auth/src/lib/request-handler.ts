import { NextResponse } from "next/server";

import { AuthenticationOptions, ProviderIdArray, ProviderId } from "../types";
import { AUTH_CODES, AUTH_MESSAGES } from "./enums/error-code";
import { toInternalRequest } from "./utils/web";
import { MethodHandler } from "./index";

export interface AuthParams {
  action: string;
  provider: string;
}

/**
 *
 * @param request - The default **App Router** Request object by NextJS.
 * @param authParams - The action and provider in the request parameters.
 * @param _config - The authentication options.
 */
export async function RequestHandler(
  request: Request,
  authParams: AuthParams,
  _config: AuthenticationOptions,
) {
  if (!ProviderIdArray.includes(authParams.provider as ProviderId)) {
    return NextResponse.json(
      {
        code: AUTH_CODES.PROVIDER_NOT_SUPPORTED,
        message: AUTH_MESSAGES[AUTH_CODES.PROVIDER_NOT_SUPPORTED],
      },
      { status: 400 },
    );
  }

  const internalRequest = await toInternalRequest(request, authParams);
  if (!internalRequest) return Response.json("Bad request: ", { status: 400 });

  try {
    const internalResponse = await MethodHandler(internalRequest, _config);
    return NextResponse.json(internalResponse, { status: 200 });
  } catch (e) {
    const error = e as Error;
    console.log(error.message ?? e);

    return NextResponse.json(
      {
        message:
          error.message || "Something went wrong! Please try again later.",
      },
      { status: 400 },
    );
  }
}
