import { Prisma, PrismaClient } from "@hbasports/prisma/client.js";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(
    inputData: Pick<
      Prisma.UserCreateInput,
      "username" | "email" | "password" | "slug"
    >
  ) {
    const player = await this.prisma.user.create({
      data: inputData,
    });

    return player;
  }
}
