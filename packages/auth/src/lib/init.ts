import * as jwt from './utils/jwt'
import {
  AuthenticationOptions,
  InternalOptions,
} from "../types";
import { parseProviders } from "./utils/providers";

interface InitParams {
  url: URL;
  authOptions: AuthenticationOptions;
  providerId: string;
  callbackUrl?: string;
}

export const defaultCallbacks: InternalOptions["callbacks"] = {
  jwt({ token }) {
    return token;
  },
  signIn() {
    return true;
  },
};

export async function init({
  authOptions: config,
  providerId,
  callbackUrl,
  url: stringUrl,
}: InitParams): Promise<{
  options: InternalOptions;
}> {
  const url = new URL(stringUrl);
  const { providers, provider } = parseProviders({ url, providerId, config });

  const maxAge = 30 * 24 * 60 * 60; // Sessions will expire after 30 days by default

  const options: InternalOptions = {
    provider,
    providers,
    jwt: {
      secret: config.jwt?.secret ?? "",
      encode: jwt.encode
    },
    url,
    cookies: config.cookies ?? {},
    callbacks: { ...defaultCallbacks, ...config.callbacks },
  };

  return { options };
}
