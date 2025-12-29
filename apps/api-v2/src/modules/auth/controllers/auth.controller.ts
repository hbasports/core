import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post('/signup')
    async signup(@Body() body) {
        return body
    }

}
