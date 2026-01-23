import { headers as nextHeaders, cookies } from "next/headers";
import { redirect } from "next/navigation";

import type {  } from "@/types";
import { createActionURL } from "./utils/env";
import { AuthenticationOptions, SignInOptions, type ProviderId } from "../types";

/**
 * Initiates a signup flow.
 * @todo Handles CSRF protection.
 */
export async function signIn(
  providerId: ProviderId,
  options: SignInOptions<true>,
  config: AuthenticationOptions,
) {
  const headers = new Headers(await nextHeaders());
  const { redirect: shouldRedirect = true, redirectTo, ...rest } = options;

  const callbackUrl = redirectTo?.toString() ?? headers.get("Referer") ?? "/";
  const signInURL = createActionURL(
    "signin",
    headers.get("x-forwarded-proto") as string,
    headers,
    process.env,
  );

  if (!providerId) {
    signInURL.searchParams.append("callbackUrl", redirectTo as string);
    if (shouldRedirect) redirect(signInURL.toString());
    return signInURL.toString();
  }

  let url = `${signInURL}/${providerId}`;
  let foundProvider: { type?: ProviderId } = {};

  for (const provider of config.providers) {
    if (provider.type === providerId) {
      foundProvider = {
        type: provider.type as ProviderId,
      };
    }
  }

  console.debug(foundProvider.type)

  if (!foundProvider.type) {
    const url = `${signInURL}?${new URLSearchParams({ callbackUrl })}`;
    if (shouldRedirect) redirect(url);
    return url;
  }

  if (foundProvider.type === "credentials") {
    url = url.replace("signin", "callback");
  }

  const body = new URLSearchParams({ callbackUrl });
  const req = new Request(url, { method: "POST", headers, body });

  const res = await fetch(`${signInURL}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      callbackUrl: shouldRedirect ? callbackUrl : "",
    }),
  });

  if (!res.ok) {
    throw new Error(`Sign-in failed: ${res.status} ${res.statusText}`);
  }

  return rest;
}

export async function signOut() {}
