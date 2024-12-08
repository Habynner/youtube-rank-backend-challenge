import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn', () => {
    it('should call authService.signIn with correct parameters', async () => {
      const signInDto = { username: 'testUser', password: 'testPass' };
      mockAuthService.signIn.mockResolvedValue('token');

      const result = await authController.signIn(signInDto);

      expect(authService.signIn).toHaveBeenCalledWith('testUser', 'testPass');
      expect(result).toBe('token');
    });

    it('should return an error if signIn fails', async () => {
      const signInDto = { username: 'wrongUser', password: 'wrongPass' };
      mockAuthService.signIn.mockRejectedValue(
        new Error('Invalid credentials'),
      );

      await expect(authController.signIn(signInDto)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });
});
