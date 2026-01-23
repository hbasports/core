import { AuthAction } from "../../types";

export function createActionURL(
  action: AuthAction,
  protocol: string,
  headers: Headers,
  envObject: any,
): URL {
  const envUrl = envObject.NEXTAUTH_URL;

  let url: URL;
  if (envUrl) {
    url = new URL(envUrl);
  } else {
    const detectedHost = headers.get("x-forwarded-host") ?? headers.get("host");
    const detectedProtocol =
      headers.get("x-forwarded-proto") ?? protocol ?? "https";
    const _protocol = detectedProtocol.endsWith(":")
      ? detectedProtocol
      : detectedProtocol + ":";

    url = new URL(`${_protocol}//${detectedHost}`);
  }

  const sanitizedUrl = url.toString().replace(/\/$/, "");

  return new URL(`${sanitizedUrl}/api/auth-v2/${action}`);
}
