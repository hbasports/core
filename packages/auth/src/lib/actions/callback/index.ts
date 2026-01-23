import * as events from "../../events";
import { Account, InternalOptions } from "src/types";
import { AUTH_CODES } from "../../enums/error-code";
import { RequestInternal } from "../../../types";

export async function callback(
  request: RequestInternal,
  options: InternalOptions,
) {
  if (!options.providers) throw new Error(AUTH_CODES.PROVIDER_NOT_SUPPORTED);
  const { body: credentials, method, headers } = request;
  const { url, provider, providers, jwt, callbacks } = options;

  try {
    const userFromAuthorize = await provider.authorize(
      credentials,
      new Request(url, { headers, method, body: JSON.stringify(credentials) }),
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

    console.debug(
      `Provider: ${account.provider}\nUserID: ${account.providerAccountId}\nType: ${account.type}`,
    );

    console.debug(
      `Token: ${token?.name}, ${token?.email}, ${token?.sub}`
    )

    return credentials;
  } catch (e) {
    // TODO: Handle errors
    throw e;
  }
}
