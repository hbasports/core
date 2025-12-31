import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '../../config/prisma/client';

import { CreateUserDTO } from './dtos/auth.dto';
import { slugify } from 'src/lib/string';
import { hashPassword } from 'src/lib/password';

@Injectable()
export class AuthService {
  constructor(private readonly logger: Logger) {}
  private readonly prisma = prisma;

  async createAccount(user: CreateUserDTO) {
    const usernameSlug = slugify(user.username);

    const password = await hashPassword(user.password, 12);

    const newAccount = await this.prisma.user.create({
      data: {
        slug: usernameSlug,
        ...user,
        password,
      },
    });

    this.logger.log(`Created new account with slug: ${usernameSlug}`);
  }
}
