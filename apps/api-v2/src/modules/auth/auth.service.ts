import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@hbasports/prisma/client';

import { CreateUserDTO } from '@/modules/auth/dtos/auth.dto';
import { removeSpecialCharacters, slugify } from '@/lib/string';
import { hashPassword } from '@/lib/password';

@Injectable()
export class AuthService {
  constructor(private readonly logger: Logger) {}
  private readonly prisma = new PrismaClient();

  async createAccount(user: CreateUserDTO) {
    const displayName = removeSpecialCharacters(user.username)
    const usernameSlug = slugify(user.username);

    const password = await hashPassword(user.password, 12);

    const newAccount = await this.prisma.user.create({
      data: {
        slug: usernameSlug,
        ...user,
        username: displayName,
        password,
      },
    });

    this.logger.log(`Created new account with slug: ${usernameSlug}`);

    return newAccount
  }
}
``