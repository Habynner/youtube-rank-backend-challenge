import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('me')
  async getUserInfo(@Headers('Authorization') authHeader: string) {
    // Extrai o token do cabeçalho de autorização
    const token = authHeader?.split(' ')[1]; // 'Bearer <token>'

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    // Usa o service para obter as informações do usuário
    const user = await this.authService.getUserFromToken(token);

    return user; // Retorna as informações do usuário
  }
}
