import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { DefaultSession, NextAuthConfig, Session, User } from "next-auth";
import type { Provider } from "next-auth/providers";
import type { JWT } from "next-auth/jwt";

import { prisma } from "@hbasports/prisma";
import { UserRepository } from "@hbasports/features/users/UserRepository";
import { WEBSITE_URL } from "@hbasports/lib/constants";
import { verifyPassword } from "@hbasports/lib/auth/verifyPassword";

import { ErrorCode } from "./lib/enums/ErrorCode";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string | null;
      slug?: string | null;
      bio?: string | null;
      avatarUrl?: string | null;
      locale?: string;
      timeZone?: string;
      timeFormat?: number;
      locked?: boolean;
      emailVerified: Date | null;
    } & DefaultSession["user"];
  }
}

type UserProfile = NonNullable<
  Awaited<ReturnType<UserRepository["findByEmail"]>>
>;

const UserPresenter = {
  fromUser: (user: UserProfile): User => ({
    id: user.userId,
    name: user.username,
    email: user.email,
  }),
};

async function authorizeCredentials(
  credentials: Partial<Record<"email" | "password", unknown>> | undefined,
  _req?: Request,
): Promise<User | null> {
  if (!credentials) {
    console.error("Credentials are missing!");
    throw new Error(ErrorCode.InternalServerError);
  }

  const userRepo = new UserRepository(prisma);
  const user = await userRepo.findByEmail(
    {
      email: credentials.email as string,
    },
    { includePassword: true }, // Opt into the password
  );

  if (!user) {
    throw new Error(ErrorCode.IncorrectEmailPassword);
  }

  // Locked users can't login
  if (user.locked) {
    throw new Error(ErrorCode.UserBanned);
  }

  if (!user.password) {
    throw new Error(ErrorCode.IncorrectEmailPassword);
  }

  const isCorrectPassword = await verifyPassword(
    credentials.password as string,
    user.password,
  );
  if (!isCorrectPassword) {
    throw new Error(ErrorCode.IncorrectPassword);
  }

  return UserPresenter.fromUser(user);
}

const CredentialsProvider = Credentials({
  id: "credentials",
  name: "HBA Sports",
  type: "credentials",
  credentials: {
    email: {
      label: "Email Address",
      type: "email",
      placeholder: "john.doe@example.com",
    },
    password: {
      label: "Password",
      type: "password",
      placeholder: "Your super secure password.",
    },
  },
  authorize: authorizeCredentials,
});

const providers: Provider[] = [CredentialsProvider];

export const authConfig = {
  providers,
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).hostname === new URL(WEBSITE_URL).hostname)
        return url;
      return baseUrl;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!token.sub || !token.email) return session;

      const userRepo = new UserRepository(prisma);
      const user = await userRepo.findByEmail({ email: token.email });

      if (user) {
        session.user = { ...user, id: user.userId, emailVerified: null };
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/error",
  },
  cookies: {
    sessionToken: {
      name: "HBA_SESSION",
      options: { httpOnly: true, path: "/", sameSite: "lax", secure: false },
    },
    callbackUrl: {
      name: "HBA_CALLBACK_URL",
      options: { path: "/", sameSite: "lax", secure: false },
    },
    csrfToken: {
      name: "HBA_CSRF",
      options: { path: "/", sameSite: "lax", secure: false },
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(authConfig);
