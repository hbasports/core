import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { AuthService } from '@/modules/auth/auth.service';
import {
  CreateUserDTO,
  GetTokenDTO,
  UserDTO,
  UsernameDTO,
} from '@/modules/auth/dtos/auth.dto';
import { minutesToMilliseconds } from '@/lib/time';
import { User } from '@/decorators/user';

@Controller({
  path: '/auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() user: CreateUserDTO) {
    const newUser = await this.authService.createAccount(user);

    const payload = plainToInstance(UserDTO, newUser);
    return instanceToPlain(payload, { excludeExtraneousValues: true });
  }

  /**
   * @deprecated
   * Everything from this point has been
   * replaced with Auth.js v5 on the frontend
   */
  @Post('get-token')
  @HttpCode(HttpStatus.OK)
  async getToken(
    @Body() accountData: GetTokenDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.authService.getToken(accountData);

    const options: Readonly<CookieOptions> = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    };

    response.cookie('HBA_ACCESS', res.token, {
      ...options,
      maxAge: minutesToMilliseconds(15),
    });

    response.cookie('HBA_REFRESH', res.refreshToken, {
      ...options,
      maxAge: minutesToMilliseconds(60 * 24 * 30),
    });

    return res;
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async me(@User() user: unknown) {
    const account = await this.authService.me(user);

    const payload = plainToInstance(UserDTO, account);
    return instanceToPlain(payload, { excludeExtraneousValues: true });
  }

  @Post('username')
  @HttpCode(HttpStatus.OK)
  async checkUsername(@Body() username: UsernameDTO) {
    const result = await this.authService.checkUsername(username);
    return result;
  }
}
