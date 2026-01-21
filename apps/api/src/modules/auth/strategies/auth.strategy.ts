import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type StrategyOptions } from 'passport-jwt';
import { Request } from 'express';

import prisma from '@hbasports/prisma';
import { UserRepository } from '@hbasports/features/users/UserRepository';

export const cookieExtractor = (req: Request): string | null => {
  if (!req || !req.cookies) return null;
  return (req.cookies['HBA_SESSION'] as string) || null;
};

type JwtPayload = Partial<{ userId?: string; sub?: string }>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly userRepo = new UserRepository(prisma);
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.AUTH_SECRET,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super(options);
  }

  async validate(payload: JwtPayload) {
    if (!payload.sub) return null;
    const user = await this.userRepo.findById(payload.userId);
    return user ?? null;
  }
}
