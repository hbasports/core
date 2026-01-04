import { z } from "zod";

import { prisma } from "@hbasports/prisma/client";
import { signupSchema } from "@hbasports/prisma/zod-utils";

import { hashPassword } from "./lib/hashPassword";
import { slugify } from "./lib/slugify";
import { UserRepository } from "./UserRepository";

export class UserService {
  static async createUser(body: z.infer<typeof signupSchema>) {
    const { username, email, password } = signupSchema.parse(body);

    const hashedPassword = await hashPassword(password);

    const slugUsername = slugify(username);

    const inputData = {
      username,
      password: hashedPassword,
      slug: slugUsername,
      email,
    };

    const userRepo = new UserRepository(prisma);
    const user = await userRepo.create(inputData);

    return user;
  }
}