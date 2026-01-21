import { Module, Logger } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { PrismaModule } from '@/config/prisma/module';
import { JwtStrategy } from '@/modules/auth/strategies/auth.strategy';
import { OrganizationsRepository } from './organization.repository';

@Module({
  imports: [PassportModule, PrismaModule],
  controllers: [OrganizationsController],
  providers: [
    Logger,
    JwtStrategy,
    OrganizationsService,
    OrganizationsRepository,
  ],
})
export class OrganizationsModule {}
