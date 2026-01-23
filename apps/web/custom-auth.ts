import type {
  AuthenticationOptions,
  JWT,
  JWTOptions,
  Provider,
  User,
} from "@hbasports/auth";
import { AuthInit } from "@hbasports/auth";
import { UserRepository } from "@hbasports/features/users/UserRepository";
import prisma from "@hbasports/prisma";
import { ErrorCode } from "./lib/enums/ErrorCode";
import { verifyPassword } from "@hbasports/lib/auth/verifyPassword";

const defaultOptions: JWTOptions = {
  sameSite: "lax",
  secure: false,
  httpOnly: true,
  path: "/",
};

type UserProfile = NonNullable<
  Awaited<ReturnType<UserRepository["findByEmail"]>>
>;

const UserPresenter = {
  fromUser: (user: UserProfile): User => ({
    name: user.username as string,
    id: user.userId,
    email: user.email,
  }),
};

async function authorizeCredentials(
  credentials: Partial<Record<"email" | "password", unknown>>,
  _req: Request,
) {
  if (!credentials) {
    console.error("Credentials are missing!");
  }

  const userRepo = new UserRepository(prisma);
  const user = await userRepo.findByEmail(
    {
      email: String(credentials.email ?? ""),
    },
    { includePassword: true },
  );

  if (!user) {
    console.error("User not found.");
    throw new Error(ErrorCode.IncorrectEmailPassword);
  }

  // Locked users can't login
  if (user.locked) {
    throw new Error(ErrorCode.UserBanned);
  }

  if (!user.password) {
    console.error("User password doesn't exist.");
    throw new Error(ErrorCode.IncorrectEmailPassword);
  }

  const isCorrectPassword = await verifyPassword(
    credentials.password as string,
    user.password,
  );

  if (!isCorrectPassword) {
    throw new Error(ErrorCode.IncorrectPassword);
  }

  console.debug(user || "no-user");

  return UserPresenter.fromUser(user);
}

const AuthProvider: Provider = {
  id: "auth",
  name: "Authentication",
  type: "credentials",
  enabled: true,
  authorize: authorizeCredentials,
};

const providers: Provider[] = [AuthProvider];

export const authOptions = {
  providers,
  jwt: {
    secret: String(process.env.NEXTAUTH_SECRET),
    expiresIn: "30d",
  },
  credentials: true,
  cookies: {
    accessToken: {
      name: "HBASPORTS_ACCESS",
      options: {
        maxAge: 15 * 60,
        ...defaultOptions,
      },
    },
    refreshToken: {
      name: "HBASPORTS_REFRESH",
      options: {
        maxAge: 60 * 60 * 24 * 30,
        ...defaultOptions,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      return token;
    },
  },
} satisfies AuthenticationOptions;

export const { signIn, signOut } = AuthInit(authOptions);
