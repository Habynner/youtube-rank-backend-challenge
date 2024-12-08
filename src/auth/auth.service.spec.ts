import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UserService;

  const mockUserService = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token if credentials are valid', async () => {
      const user = { id: 1, nome: 'Test User', senha: 'testPass' };
      const email = 'test@example.com';
      const password = 'testPass';

      mockUserService.findOne.mockResolvedValue(user);
      mockJwtService.signAsync.mockResolvedValue('jwtToken');

      const result = await authService.signIn(email, password);

      expect(usersService.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual({ access_token: 'jwtToken' });
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const user = { id: 1, nome: 'Test User', senha: 'testPass' };
      const email = 'test@example.com';
      const password = 'wrongPass';

      mockUserService.findOne.mockResolvedValue(user);

      await expect(authService.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const email = 'notfound@example.com';
      const password = 'testPass';

      mockUserService.findOne.mockResolvedValue(null);

      await expect(authService.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
