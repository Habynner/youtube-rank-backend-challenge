import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email: email });
    if (user?.senha !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.nome };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
