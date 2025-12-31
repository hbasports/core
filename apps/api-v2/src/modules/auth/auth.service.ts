import { Injectable, Logger } from '@nestjs/common';

import { CreateUserDTO } from './dtos/auth.dto';
import { slugify } from 'src/lib/slugify';
import { PrismaClient } from '../../prisma/generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaClient,
  ) {}

  async createAccount(user: CreateUserDTO) {
    const usernameSlug = slugify(user.username);

    const newAccount = await this.prisma.user.create({
      data: {
        slug: usernameSlug,
        ...user,
      },
    });

    this.logger.log(usernameSlug);
  }
}
