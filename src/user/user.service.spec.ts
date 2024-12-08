import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should create a user', async () => {
    const user = new UserEntity();
    jest.spyOn(userRepository, 'save').mockResolvedValue(user);

    const result = await userService.createUser(user);

    expect(userRepository.save).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
  });

  it('should return a list of users', async () => {
    const users = [new UserEntity()];
    jest.spyOn(userRepository, 'find').mockResolvedValue(users);

    const result = await userService.usersList();

    expect(userRepository.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should update a user', async () => {
    const updateResult: UpdateResult = {
      raw: [],
      affected: 1,
      generatedMaps: [],
    };
    jest.spyOn(userRepository, 'update').mockResolvedValue(updateResult);

    const result = await userService.updateUser('1', { nome: 'Updated Name' });

    expect(userRepository.update).toHaveBeenCalledWith('1', {
      nome: 'Updated Name',
    });
    expect(result).toEqual(updateResult);
  });

  it('should delete a user', async () => {
    const deleteResult: DeleteResult = { raw: [], affected: 1 };
    jest.spyOn(userRepository, 'delete').mockResolvedValue(deleteResult);

    const result = await userService.deleteUser('1');

    expect(userRepository.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(deleteResult);
  });
});
