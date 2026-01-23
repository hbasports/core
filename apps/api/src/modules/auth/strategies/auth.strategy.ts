import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import prisma from '@hbasports/prisma';
import { UserRepository } from '@hbasports/features/users/UserRepository';

const cookieExtractor = (req: Request): string | null => {
  console.log('DEBUG: incoming request headers:', req?.headers);
  console.log('DEBUG: incoming cookies:', req?.cookies);

  if (!req || !req.cookies) return null;
  const token = req.cookies['HBA_SESSION'] as string;
  console.log('DEBUG: extracted token:', token);
  return token || null;
};

type JwtPayload = Partial<{ sub?: string }>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly userRepo = new UserRepository(prisma);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.NEXTAUTH_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('DEBUG: payload:', payload);
    if (!payload.sub) return null;
    const user = await this.userRepo.findById(payload.sub);
    return user ?? null;
  }
}
