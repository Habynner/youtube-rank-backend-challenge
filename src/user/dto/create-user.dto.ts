import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validator/email-unico.validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDto {
  id: string;

  @Expose({ name: 'name' })
  @IsString()
  @IsNotEmpty({
    message:
      'O campo name não pode estar vazio. certifique-se de estar usando (name) no payload.',
  })
  nome: string;

  @IsEmail(undefined, { message: 'email precisa estar no formato e-mail.' })
  @EmailEhUnico({ message: 'Email já cadastrado.' })
  email: string;

  @Expose({ name: 'password' })
  @Exclude({ toPlainOnly: true })
  @MinLength(6, { message: 'A senha não pode ter menos de 6 caracteres.' })
  @IsNotEmpty({
    message:
      'A senha é obrigatória. certifique-se de estar usando (password) no payload.',
  })
  senha: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
//O decorator @Expose serve para definir o nome da variavel do payload de acordo com o frontend, podemos desenvolver em português e interagir com o front em inglês..
//@IsNomeUsuarioUnico e  @EmailEhUnico são decoratos criados por mim, para verificar se nome e email já existem na base de dados.. (ficam na pasta validator).
