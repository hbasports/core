import { AuthenticationOptions, InternalProvider, Provider } from "../../types";

export function parseProviders(params: {
  url: URL;
  providerId: string;
  config: AuthenticationOptions;
}): {
  providers: InternalProvider[];
  provider: InternalProvider;
} {
  const { providerId, config } = params;
  const url = new URL(params.url.origin);

  const providers: InternalProvider[] = config.providers.map(
    (provider: Provider<any>) => {
      const merged: InternalProvider = {
        type: "credentials",
        authorize: provider.authorize,
        id: provider.id,
        name: provider.name ?? provider.id,
        signinUrl: `${url}/signin/`,
        callbackUrl: `${url}/callback`,
      };

      return merged as InternalProvider;
    },
  );

  const provider = providers.find((p) => p.type === providerId);

  if (!provider) {
    throw new Error(
      providerId
        ? `Provider with id "${providerId}" not found.`
        : "No providers configured.",
    );
  }

  return { providers, provider };
}
