import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
// import { v4 as uuid } from 'uuid';
// import { UserListDto } from './dto/userList.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<NestResponse> {
    const createdUser = await this.userService.createUser(createUserDto);
    return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comHeader({
        Location: `/users/${createdUser.nome}`,
      })
      .comBody(createdUser)
      .build();
  }

  @Get()
  async usersList() {
    const userDb = await this.userService.usersList();
    return userDb;
  }
  @Get(':nomeDeUsuario')
  async usersByName(
    @Param('nomeDeUsuario') nomDeUsuario: string,
  ): Promise<UserEntity> {
    const userFind = await this.userRepository.findByName(nomDeUsuario);
    if (!userFind) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found.',
      });
    }
    return userFind;
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userUpdated = await this.userService.updateUser(id, updateUserDto);

    return {
      user: userUpdated,
      message: `The user ${updateUserDto.nome} has been updated.`,
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const userRemoved = await this.userService.deleteUser(id);

    return {
      user: userRemoved,
      message: `The user ${id} has been deleted.`,
    };
  }
}
