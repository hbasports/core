import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@hbasports/prisma/client';

import { CreateUserDTO } from '@/modules/auth/dtos/auth.dto';
import { removeSpecialCharacters, slugify } from '@/lib/string';
import { checkPassword, hashPassword } from '@/lib/password';

import { v7 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';

type AccountCredentials = {
  token: string;
  refresh: string;
};

@Injectable()
export class AuthService {
  constructor(private readonly logger: Logger) {}
  private readonly prisma = new PrismaClient();

  async createAccount(user: CreateUserDTO) {
    const displayName = removeSpecialCharacters(user.username);
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

    return newAccount;
  }

  async getToken(
    accountData: Pick<CreateUserDTO, 'password' | 'email'> & {
      accountId: string;
    },
  ): Promise<AccountCredentials | any> {
    const jwtId = uuid();

    const account = await this.prisma.user.findFirst({
      where: {
        OR: [{ userId: accountData.accountId }, { email: accountData.email }],
      },
    });

    if (!account) {
      throw new UnauthorizedException('The information provided was invalid.');
    }

    const isPasswordValid = await checkPassword(
      accountData.password,
      account.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('The password provided is incorrect.');

    const payload = {
      createdAt: Date.now(),
      jwtId,
      sub: account.id,
    };

    const token = sign(payload, process.env.ENCRYPTION_KEY!, {
      expiresIn: '15m',
    });

    const refreshToken = sign(
      { sub: account.id, jwtId },
      process.env.ENCRYPTION_KEY!,
      { expiresIn: '30d' },
    );

    return {
      token,
      refreshToken,
    };
  }

  async checkUsername(givenUsername: Pick<CreateUserDTO, 'username'>) {
    const account = await this.prisma.user.findFirst({
      where: {
        username: givenUsername.username
      }
    })

    return {
      available: account === null
    }
  }
}
