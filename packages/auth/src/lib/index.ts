import * as actions from "./actions";
import { init } from "./init";
import { AuthenticationOptions, RequestInternal } from "../types";

/** @internal */
export async function MethodHandler(
  req: RequestInternal,
  _options: AuthenticationOptions,
) {
  const { action, provider, method } = req;

  const { options } = await init({
    authOptions: _options,
    providerId: req.provider,
    url: new URL(req.url),
  });

  if (method === "GET") {
  } else if (method === "POST") {
    switch (action) {
      case "signin":
        return "test";
      case "callback":
        return await actions.callback(req, options);
    }
  }
}
