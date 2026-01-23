import * as actions from "./actions";
import { AuthenticationOptions } from "../types";
import { RequestInternal } from "../types";
import { init } from "./init";

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

  console.debug(options)

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
