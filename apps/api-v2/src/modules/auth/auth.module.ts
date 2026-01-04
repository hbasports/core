import { Module, Logger } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../config/prisma/module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [Logger, AuthService]
})
export class AuthModule {}
