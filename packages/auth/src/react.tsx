"use client";

import * as React from "react";

import { WEBSITE_URL } from "@hbasports/lib/constants";

import { ProviderId, ProvidersRecord, SignInOptions } from "./types";

export async function signIn<Redirect extends boolean = true>(
  provider?: ProviderId,
  options?: SignInOptions<Redirect>,
) {
  const { redirect = true } = options ?? {};
  const redirectTo = options?.redirectTo ?? window.location.href;

  const baseUrl = WEBSITE_URL;

  console.log(options?.email ?? "User email.")

  if (!provider || !ProvidersRecord[provider]) {
    const url = `${baseUrl}/signin?${new URLSearchParams({
      callbackUrl: options?.redirectTo as string,
    })}`;
    window.location.href = url;
    return;
  }

  const providerType = provider;

  const signInUrl = `${baseUrl}/api/auth-v2/${
    providerType === "credentials" ? "callback" : "signin"
  }/credentials`;

  const res = await fetch(signInUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Return-Redirect": "1",
    },
    body: JSON.stringify({
      callbackUrl: redirectTo,
    }),
  });

  const data = await res.json();

  // if (redirect) {
  //   const url = data.url ?? redirectTo;
  //   window.location.href = url;
  //   if (url.includes("#")) window.location.reload();
  //   return;
  // }

  return {
    status: res.status,
    ok: res.ok,
    url: data.url ?? null,
  };
}
