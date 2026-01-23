import { CommonProviderOptions } from "../providers";

export interface CredentialsConfig extends CommonProviderOptions {
  type: "credentials";
  authorize: (
    credentials: Partial<Record<string, unknown>>,
    request: Request,
  ) => Awaited<any | null>;
}
