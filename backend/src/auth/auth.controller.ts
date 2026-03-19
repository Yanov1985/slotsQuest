import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

type LoginBody = {
  login: string;
  password: string;
};

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() body: LoginBody) {
    return this.authService.login(body?.login, body?.password);
  }

  @Get('me')
  me(@Headers('authorization') authorization?: string) {
    if (!authorization) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const token = this.authService.extractTokenFromHeader(authorization);
    const user = this.authService.verifyToken(token);

    return {
      authenticated: true,
      user,
    };
  }
}

