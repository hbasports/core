import { TextEncoder } from "util";

import { JWT } from "@/types";
import { SignJWT } from "jose";

const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

const now = () => (Date.now() / 1000) | 0;

const alg = "HS256";

/** Issues a JWT. */
export async function encode<Payload = JWT>(params: JWTEncodeParams<Payload>) {
  const { token = {}, secret, maxAge = DEFAULT_MAX_AGE } = params;
  const encryptionSecret = await getEncryptionKey(secret)

  // @ts-expect-error
  return await new SignJWT(token)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(now() + maxAge)
    .setJti(crypto.randomUUID())
    .sign(encryptionSecret);
}

async function getEncryptionKey(secret: string): Promise<Uint8Array> {
    return await new TextEncoder().encode(secret)
}

export interface JWTEncodeParams<Payload = JWT> {
  /**
   * The maximum age of the issued JWT in seconds
   *
   * @default 30 * 24 * 60 * 60 // 30 days
   */
  maxAge?: number;
  secret: string;
  token?: Payload;
}

export interface JWTDecodeParams {}
