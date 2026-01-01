import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Logger,
} from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';

import { CreateUserDTO } from '@/modules/auth/dtos/auth.dto';

@Controller({
  path: '/auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger();

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() user: CreateUserDTO) {
    const accountData = await this.authService.createAccount(user);
    return {
      accountId: accountData.userId,
      accountSlug: accountData.slug,
      email: accountData.email,
    };
  }
}
