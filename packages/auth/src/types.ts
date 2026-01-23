import { CommonProviderOptions } from "./providers";
import { CredentialsConfig } from "./providers/credentials";

export type Awaitable<T> = T | PromiseLike<T>;

export interface JWTOptions {
  maxAge?: string | number;
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  sameSite: "strict" | "lax" | "none";
}

export const defaultCookieOptions: Record<
  string,
  { name: string; options: JWTOptions }
> = {
  refreshToken: {
    name: "REFRESH_TOKEN",
    options: {
      sameSite: "lax",
      maxAge: 15 * 60,
    },
  },
  accessToken: {
    name: "ACCESS_TOKEN",
    options: {
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    },
  },
};

export interface Provider<TData = any> {
  /**
   * The unique id for this provider.
   */
  id: string;
  /**
   * Optional display name. Useful for displaying on websites
   */
  name?: string;
  /**
   * The type of provider.
   */
  type: ProviderId;
  /**
   * The authorize function. Should return user data or throw on error.
   */
  authorize: (
    credentials: TData,
    /**
     * The original request.
     */
    request: Request,
  ) => Awaitable<any | null>;
  /**
   * Enable or disable this provider.
   */
  enabled?: boolean;
}

export type InternalProviderType = "credentials";

export type InternalProvider<T = InternalProviderType> =
  (T extends "credentials" ? CredentialsConfig : never) & {
    signinUrl: string;
    callbackUrl: string;
  };

export interface CredentialsData {
  email: string;
  password: string;
}

export interface Account {
  provider: string;
  providerAccountId: string;
  type: ProviderId;
}

export interface DefaultUser {
  id?: string;
  name?: string;
  email?: string;
}

export interface User extends DefaultUser {}

type CookieOption = { name: string; options: JWTOptions };

interface JWTConfig {
  secret: string;
  expiresIn?: string | number;
  encryption?: boolean;
}

export interface SignInOptions<Redirect extends boolean = true> extends Record<
  string,
  unknown
> {
  /**
   * The URL to redirect to after successful authentication.
   */
  redirectTo?: string;
  /**
   * Whether the flow should redirect after successfully authenticating.
   */
  redirect?: Redirect;
}

export interface InternalOptions {
  url: URL;
  provider: InternalProvider;
  providers: InternalProvider[];
  jwt: JWTConfig;
  cookies: Record<string, CookieOption>;
  callbacks: NonNullable<Required<AuthenticationOptions["callbacks"]>>;
}

export type AuthAction =
  | "callback"
  | "csrf"
  | "error"
  | "session"
  | "signin"
  | "signout"
  | "verify-request";

export interface RequestInternal extends Partial<Request> {
  provider: ProviderId;
  action: AuthAction;
  url: string;
  body: any;
}

export type ProviderId = "credentials" | "google" | "github" | "microsoft";

export const ProviderIdArray: readonly ProviderId[] = [
  "credentials",
  "google",
  "github",
  "microsoft",
];

export const ProvidersRecord: Record<ProviderId, unknown> = {
  credentials: "credentials",
  google: "google",
  microsoft: "microsoft",
  github: "github",
};

type RequestParamType = string[] | Record<string, unknown>;
export interface RequestContext<Data extends RequestParamType> {
  params: Awaited<Data>;
}

export interface DefaultJWT {
  name?: string | null;
  email?: string | null;
  sub?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

export interface JWT extends Record<string, unknown>, DefaultJWT {}

/** Configure authentication. */
export interface AuthenticationOptions {
  /**
   * Configuration options for JWT use with the authentication flow.
   * @param {string} secret - The secret used to encrypt JWTs.
   * this param is required. If it is not set, it will return an `500`</code>` error.
   * @param {string | number} maxAge - Defines the maximum age a JSON Web Token will stay valid. @default 60 * 60 * 24 * 30 // 30 days
   * @param {boolean} encryption - Defines whether a JSON Web Token's payload should be encrypted beforehand.
   */
  jwt?: JWTConfig;
  /**
   * If set to `false`, the default credentials flow with return a `503` error.
   *
   * When set to `true`, the flow will behave as normal.
   * @default true
   */
  credentials?: boolean;
  /**
   * Defines whether to use the default authentication flow if
   * a provider is accidentally not passed through the authentication
   * call or return an error.
   * @default false
   */
  useDefaultCredentialsWhenUndefined?: boolean;
  /**
   * You can override the default cookies used by the credentials flow.
   * You can specify one or more cookies with custom configuration.
   */
  cookies?: Record<string, CookieOption>;
  /**
   * Array of auth providers.
   */
  providers: Provider[];
  /**
   * Callbacks are asynchronous functions you can use to control when an action is performed.
   * Callbacks are **extremely powerful**, especially in scenarios involving JSON Web Tokens
   * as they to **integrate with external databases or APIs** safely as code is run on the server.
   */

  callbacks: {
    /**
     * Controls whether a user is allowed to sign in or not
     * Returning `true` contains the sign-in flow.
     * Returning `false` or throwing an error with stop the sign-in flow and redirect the user to the erro rpage.
     * Returning a string with redirect the user to specificed URL.
     *
     * @example
     * ```ts
     * callbacks: {
     *  async signIn({ profile }) {
     *    return profile?.email.endsWith("@yourdomain.com")
     *  )}
     * }
     * ```
     */
    signIn?: (params: { user: any; account: any }) => Awaited<boolean | string>;
    jwt: (params: {
      token: JWT;
      user: User;
      account?: Account | null;
      session?: any;
    }) => Awaitable<JWT | null>;
  };
}
