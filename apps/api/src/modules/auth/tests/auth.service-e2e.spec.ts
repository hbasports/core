import { Test } from '@nestjs/testing';
import {
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let app: INestApplication;

  const mockAuthService = {
    getToken: jest.fn(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return auth cookies and 200', async () => {
    mockAuthService.getToken.mockResolvedValue({
      token: 'access-token',
      refreshToken: 'refresh-token',
    });

    const res = await request(app.getHttpServer())
      .post('/auth/get-token')
      .send({
        accountId: 'user-123',
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(200);

    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies).toEqual(
      expect.arrayContaining([
        expect.stringContaining('HBA_ACCESS='),
        expect.stringContaining('HBA_REFRESH'),
      ]),
    );
  });

  it('should return 401 with invalid credentials', async () => {
    mockAuthService.getToken.mockRejectedValue(
      new UnauthorizedException('Invalid credentials!'),
    );

    const res = await request(app.getHttpServer())
      .post('/auth/get-token')
      .send({
        accountId: 'user-123',
        email: 'test@example.com',
        password: 'wrong-password',
      })
      .expect(401);
  });

  it('should return 400 with invalid input', async () => {
    mockAuthService.getToken.mockResolvedValue({
      token: 'access-token',
      refreshToken: 'refresh-token',
    });

    const res = await request(app.getHttpServer())
      .post('/auth/get-token')
      .send({
        accountId: 'user-123',
        email: 'test@example.com',
      })
      .expect(400);
  });
});
