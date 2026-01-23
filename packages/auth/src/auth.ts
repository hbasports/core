import { NextRequest, NextResponse } from "next/server";

import { signIn, signOut } from "./lib/events";
import type { AuthenticationOptions, RequestContext, SignInOptions } from "./types";
import type { ProviderId } from "./types";
import { RequestHandler } from "./lib/request-handler";

export function AuthInit(config: AuthenticationOptions) {
  const handler = async (
    _req: NextRequest,
    _context: RequestContext<{ auth: string[] }>,
  ) => {
    const contextParams = (await _context.params).auth;

    const action = String(contextParams[0]);
    const provider = contextParams[1] ?? undefined;

    const authParams = {
      action,
      provider,
    };

    console.debug("Config: ", config)

    return await RequestHandler(_req, authParams, config);
  };

  return {
    handlers: { GET: handler, POST: handler } as const,
    signIn: async (provider: ProviderId, options: SignInOptions) => {
      return signIn(provider, options, config);
    },
    signOut: () => {
      return signOut();
    },
  };
}
