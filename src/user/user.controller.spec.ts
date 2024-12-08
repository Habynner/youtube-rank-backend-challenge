import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserListDto } from './dto/userList.dto';
import { UserRepository } from './user.repository';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            usersList: jest.fn(),
            usersByName: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
        UserRepository,
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a user and return the created user', async () => {
      const createUserDto: CreateUserDto = {
        nome: 'John Doe',
        email: 'john@example.com',
        senha: 'password123',
        id: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };

      const createdUser: CreateUserDto = {
        id: '1',
        nome: 'John Doe',
        email: 'john@example.com',
        senha: 'password123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      };

      jest.spyOn(userService, 'createUser').mockResolvedValue(createdUser);

      const response = await userController.createUser(createUserDto);

      expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
      expect(response).toMatchObject({
        status: HttpStatus.CREATED,
        body: createdUser,
      });
    });
  });

  describe('usersList', () => {
    it('should return a list of users', async () => {
      const users: UserListDto[] = [
        {
          id: '1',
          name: 'John Doe',
        },
      ];

      jest.spyOn(userService, 'usersList').mockResolvedValue(users);

      const response = await userController.usersList();

      expect(userService.usersList).toHaveBeenCalled();
      expect(response).toEqual(users);
    });
  });

  //   describe('usersByName', () => {
  //     it('should return a user by name', async () => {
  //       const user: UserEntity = {
  //         id: '1',
  //         nome: 'John Doe',
  //         email: 'john@example.com',
  //         senha: 'password123',
  //         createdAt: new Date().toISOString(),
  //         updatedAt: new Date().toISOString(),
  //         deletedAt: null,
  //       };

  //       jest.spyOn(userService, 'findByName').mockResolvedValue(user);

  //       const response = await userController.usersByName('John Doe');

  //       expect(userService.findByName).toHaveBeenCalledWith('John Doe');
  //       expect(response).toEqual(user);
  //     });

  // it('should throw NotFoundException if user is not found', async () => {
  //   jest.spyOn(userService, 'usersByName').mockResolvedValue(null);

  //   await expect(userController.usersByName('Nonexistent')).rejects.toThrow(
  //     new NotFoundException({
  //       statusCode: HttpStatus.NOT_FOUND,
  //       message: 'User not found.',
  //     }),
  //   );
  // });
  //   });

  describe('updateUser', () => {
    it('should update a user and return confirmation', async () => {
      const updateDto: UpdateUserDto = { nome: 'Updated Name' };

      jest.spyOn(userService, 'updateUser').mockResolvedValue({
        generatedMaps: [],
        raw: [],
        affected: 1,
      });

      const response = await userController.updateUser('1', updateDto);

      expect(userService.updateUser).toHaveBeenCalledWith('1', updateDto);
      expect(response).toEqual({
        message: 'The user Updated Name has been updated.',
        user: {
          affected: 1,
          generatedMaps: [],
          raw: [],
        },
      });
    });
  });

  describe('removeUser', () => {
    it('should delete a user and return confirmation', async () => {
      jest.spyOn(userService, 'deleteUser').mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const response = await userController.removeUser('1');

      expect(userService.deleteUser).toHaveBeenCalledWith('1');
      expect(response).toEqual({
        message: 'The user 1 has been deleted.',
        user: {
          affected: 1,
          raw: [],
        },
      });
    });
  });
});
