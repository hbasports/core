import type { Prisma, PrismaClient } from "@hbasports/prisma";

const userSelect = {
  id: false,
  userId: true,
  username: true,
  slug: true,
  email: true,
  bio: true,
  avatarUrl: true,
  locale: true,
  timeZone: true,
  timeFormat: true,
  locked: true,
} satisfies Prisma.UserSelect;

export class UserRepository {
  constructor(private prismaClient: PrismaClient) {}

  private buildSession({
    includePassword = false,
  }: { includePassword?: boolean } = {}) {
    return includePassword
      ? { ...userSelect, password: true }
      : { ...userSelect, password: false };
  }

  async findById(id: string, opts?: { includePassword?: boolean }) {
    const user = await this.prismaClient.user.findUnique({
      where: { userId: id },
      select: this.buildSession(opts),
    });
    if (!user) return null;
    return user;
  }

  async findByEmail(
    { email }: { email: string },
    opts?: { includePassword?: boolean },
  ) {
    const user = await this.prismaClient.user.findUnique({
      where: { email },
      select: this.buildSession(opts),
    });
    if (!user) return null;
    return user;
  }

  async findByIdOrThrow(id: string, opts?: { includePassword?: boolean }) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async findByIds(
    { ids }: { ids: string[] },
    opts?: { includePassword?: boolean },
  ) {
    return this.prismaClient.user.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      select: this.buildSession(opts),
    });
  }
}
