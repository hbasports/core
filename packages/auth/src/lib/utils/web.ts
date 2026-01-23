import { AuthParams } from "../request-handler";
import { AuthAction, ProviderId, RequestInternal } from "../../types";

export async function toInternalRequest(
  req: Request,
  authParams: AuthParams,
): Promise<RequestInternal | undefined> {
  try {
    if (req.method !== "GET" && req.method !== "POST") {
      throw new Error("Only GET and POST requests are supported.");
    }

    const credentials = await req.json();

    const { action, provider } = authParams;

    return {
      url: req.url,
      action: action as AuthAction,
      provider: provider as ProviderId,
      method: req.method,
      headers: req.headers,
      body: credentials ?? undefined,
    };
  } catch (e) {
    console.error(e as Error);
    console.debug("request", req);
  }
}
