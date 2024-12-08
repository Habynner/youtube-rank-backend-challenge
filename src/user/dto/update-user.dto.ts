import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EmailEhUnico } from '../validator/email-unico.validator';
import { Exclude, Expose } from 'class-transformer';

export class UpdateUserDto {
  id?: string;

  @Expose({ name: 'name' })
  @IsString()
  @IsNotEmpty({
    message:
      'O campo name não pode estar vazio. certifique-se de estar usando (name) no payload.',
  })
  @IsOptional()
  name?: string;

  @IsEmail(undefined, { message: 'email precisa estar no formato e-mail.' })
  @EmailEhUnico({ message: 'Email já cadastrado.' })
  @IsOptional()
  email?: string;

  @Expose({ name: 'password' })
  @Exclude({ toPlainOnly: true })
  @MinLength(6, { message: 'A senha não pode ter menos de 6 caracteres.' })
  @IsNotEmpty({
    message:
      'A senha é obrigatória. certifique-se de estar usando (password) no payload.',
  })
  @IsOptional()
  senha?: string;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
