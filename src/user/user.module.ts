import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import {
  EmailEhUnicoValidator,
  NomeEhUnicoValidator,
} from './validator/email-unico.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    EmailEhUnicoValidator,
    NomeEhUnicoValidator,
  ],
})
export class UserModule {}
