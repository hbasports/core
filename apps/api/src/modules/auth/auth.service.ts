import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { prisma } from '@hbasports/prisma';
import { slugify } from '@hbasports/lib/slugify';
import { hashPassword, verifyPassword } from '@hbasports/lib/auth';

import {
  CreateUserDTO,
  GetTokenDTO,
  UsernameDTO,
} from '@/modules/auth/dtos/auth.dto';
import { removeSpecialCharacters } from '@/lib/string';
import { JwtService } from '@/modules/jwt/jwt.service';
import { User } from '@/decorators/user';

type AccountCredentials = {
  token: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(user: CreateUserDTO) {
    const displayName = removeSpecialCharacters(user.username);
    const usernameSlug = slugify(user.username);

    const password = await hashPassword(user.password);

    const newAccount = await prisma.user.create({
      data: {
        ...user,
        slug: usernameSlug,
        username: displayName,
        password,
      },
    });

    this.logger.log(`Created new account with slug: ${usernameSlug}`);

    return newAccount;
  }

  async checkUsername(givenUsername: UsernameDTO) {
    const account = await prisma.user.findFirst({
      where: {
        username: givenUsername.username,
      },
    });

    return {
      available: account === null,
    };
  }

  /**
   * @deprecated
   * Everything from this point has been
   * replaced with Auth.js v5 on the frontend
   */
  async me(@User() user: Partial<{ userId: string }>) {
    const account = await prisma.user.findFirst({
      where: {
        userId: user.userId,
      },
    });

    if (!account) {
      throw new UnauthorizedException("User isn't permitted.");
    }

    return account;
  }

  async getToken(accountData: GetTokenDTO): Promise<AccountCredentials> {
    const databaseAccount = await prisma.user.findFirst({
      where: accountData.accountId
        ? { userId: accountData.accountId }
        : { email: accountData.email },
    });

    if (!databaseAccount) {
      throw new UnauthorizedException('The information provided is incorrect!');
    }

    const isPasswordValid: boolean = await verifyPassword(
      accountData.password,
      databaseAccount.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('The password provided is incorrect.');
    }

    const payload = {
      sub: databaseAccount.userId,
    };

    const jwtToken = this.jwtService.signAccessToken(payload);
    const refreshToken = this.jwtService.signRefreshToken(payload);

    this.logger.log(
      `Issued new auth token for user ${databaseAccount.slug} (${databaseAccount.userId}}`,
    );

    return {
      token: jwtToken,
      refreshToken,
    };
  }
}
