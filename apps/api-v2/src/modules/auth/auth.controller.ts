import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDTO } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger();

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() user: CreateUserDTO) {
    this.authService.createAccount(user);

    return {
      success: true,
    };
  }
}
