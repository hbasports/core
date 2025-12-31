import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDTO } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger();

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() user: CreateUserDTO) {
    try {
      await this.authService.createAccount(user);
      return {
        success: true,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong! Please try again later.',
      );
    }
  }
}
