import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDTO } from './dtos/auth.dto';

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
    };
  }

  @Post('get-token')
  @HttpCode(HttpStatus.OK)
  async getToken(
    @Body()
    accountData: Pick<CreateUserDTO, 'email' | 'password'> & {
      accountId: string;
    },
  ) {
    const { token, refreshToken } =
      await this.authService.getToken(accountData);
    return { token, refreshToken };
  }

  @Post('username')
  @HttpCode(HttpStatus.OK)
  async checkUsername(@Body() username: Pick<CreateUserDTO, 'username'>) {
    const result = await this.authService.checkUsername(username)
    return result
  }
}
