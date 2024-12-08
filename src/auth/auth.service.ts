import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserListDto } from 'src/user/dto/userList.dto';

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
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserFromToken(token: string): Promise<UserListDto> {
    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.userId;

      const user = await this.usersService.findOne({ id: userId });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
