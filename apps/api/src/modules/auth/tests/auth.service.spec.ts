/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { Logger } from '@nestjs/common';
import { JwtService } from '@/modules/jwt/jwt.service';

jest.mock('@hbasports/prisma', () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

jest.mock('@hbasports/lib/auth', () => ({
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
}));

jest.mock('@/lib/string', () => ({
  removeSpecialCharacters: jest.fn(),
}));

jest.mock('@hbasports/lib/slugify', () => ({
  slugify: jest.fn(),
}));

import { prisma } from '@hbasports/prisma';
import { slugify } from '@hbasports/lib/slugify';

import { verifyPassword, hashPassword } from '@hbasports/lib/auth/index';
import { removeSpecialCharacters } from '@/lib/string';

describe('AuthService/Controller', () => {
  let service: AuthService;
  let logger: Logger;
  let jwtService: JwtService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAccessToken: jest.fn(),
            signRefreshToken: jest.fn(),
          },
        },
      ],
      controllers: [],
    }).compile();

    service = module.get<AuthService>(AuthService);
    logger = module.get<Logger>(Logger);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user account', async () => {
    const mockUser = {
      username: 'test_user!',
      email: 'test@example.com',
      password: 'password123',
    };

    const mockHashedPassword = 'hashed_password_xyz';
    const mockCreatedUser = {
      userId: 'user-123',
      username: 'testuser',
      slug: 'test-user',
      email: 'test@example.com',
      password: mockHashedPassword,
    };

    (removeSpecialCharacters as jest.Mock).mockReturnValue('testuser');
    (slugify as jest.Mock).mockReturnValue('test-user');
    (hashPassword as jest.Mock).mockResolvedValue(mockHashedPassword);
    (prisma.user.create as jest.Mock).mockResolvedValue(mockCreatedUser);

    const result = await service.createAccount(mockUser);

    expect(hashPassword).toHaveBeenCalledWith('password123', 12);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        slug: expect(String),
        username: expect(String),
        email: 'test@example.com',
        password: mockHashedPassword,
      },
    });

    expect(logger.log).toHaveBeenCalledWith(
      `Created new account with slug: ${mockCreatedUser.slug}`,
    );
    expect(result).toEqual(mockCreatedUser);
  });

  it('should return tokens for valid credentials', async () => {
    const accountData = {
      accountId: 'user-123',
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser = {
      userId: 'user-123',
      slug: 'test-user',
      email: 'test@example.com',
      password: 'hashed_password_xyz',
    };

    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (verifyPassword as jest.Mock).mockResolvedValue(true);
    (jwtService.signAccessToken as jest.Mock).mockReturnValue(
      'mock-access-token',
    );
    (jwtService.signRefreshToken as jest.Mock).mockReturnValue(
      'mock-refresh-token',
    );

    const result = await service.getToken(accountData);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: accountData.accountId
        ? { userId: accountData.accountId }
        : { email: accountData.email },
    });

    expect(verifyPassword).toHaveBeenCalledWith(
      accountData.password,
      mockUser.password,
    );

    const payload = {
      sub: accountData.accountId,
    };

    expect(jwtService.signAccessToken).toHaveBeenCalledWith(payload);
    expect(jwtService.signRefreshToken).toHaveBeenCalledWith(payload);

    expect(logger.log).toHaveBeenCalled();

    expect(result).toEqual({
      token: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    });
  });

  it('should throw UnauthorizedException when user not found', async () => {
    const accountData = {
      accountId: 'user-123',
      email: 'test@example.com',
      password: 'password123',
    };

    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    await expect(service.getToken(accountData)).rejects.toThrow(
      'The information provided is incorrect!',
    );

    expect(prisma.user.findFirst).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException when password is incorrect', async () => {
    const accountData = {
      accountId: 'user-123',
      email: 'test@example.com',
      password: 'hashed_password_xyz',
      slug: 'test-user',
    };

    (prisma.user.findFirst as jest.Mock).mockResolvedValue(accountData);

    (verifyPassword as jest.Mock).mockResolvedValue(false);

    await expect(service.getToken(accountData)).rejects.toThrow(
      'The password provided is incorrect.',
    );

    expect(verifyPassword).toHaveBeenCalled();
  });
});
