import { AUTH_CODES } from "../../enums/error-code";
import { Account, InternalOptions } from "../../../types";
import { RequestInternal } from "@/types";

export async function callback(
  request: RequestInternal,
  options: InternalOptions,
) {
  if (!options.providers) throw new Error(AUTH_CODES.PROVIDER_NOT_SUPPORTED);
  const { body, method, headers } = request;
  const { url, provider, providers, jwt, callbacks } = options;

  try {
    console.debug(body);

    const userFromAuthorize = await provider.authorize(
      body,
      new Request(url, { headers, method, body: JSON.stringify(body) }),
    );
    const user = userFromAuthorize;

    if (!user) {
      throw new Error("User not found.");
    }

    user.id = user.id?.toString() ?? crypto.randomUUID();

    const account = {
      provider: provider.id,
      type: "credentials",
      providerAccountId: user.id,
    } satisfies Account;

    // Defines the default JWT payload
    const defaultToken = {
      name: user.name,
      email: user.email,
      sub: user.id,
    };

    const token = await callbacks.jwt({
      token: defaultToken,
      user,
      account,
    });

    const newToken = await jwt.encode(jwt)

    console.debug(newToken)

    console.debug(
      `Provider: ${account.provider}\nUserID: ${account.providerAccountId}\nType: ${account.type}`,
    );

    console.debug(`Token: ${JSON.stringify(token)}`);

    return body;
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
}
