import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/lib/pipes/zod-validation-pipe';
import { signupSchema } from '@hbasports/prisma/zod-utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body(new ZodValidationPipe(signupSchema)) user) {
    this.authService.createUser(user);

    return {
      success: true
    }
  }
}
