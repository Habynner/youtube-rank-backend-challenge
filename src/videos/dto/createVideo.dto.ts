import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { VideoEntity } from '../entities/video.entity';

export class VideoImageDTO {
  id: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  description: string;

  video: VideoEntity;
}

export class CreateVideoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  userId: string;

  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do vídeo não pode ser vazio' })
  alias: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do vídeo não pode ser vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Url do vídeo não pode ser vazio' })
  url: string;

  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  votes: number;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do vídeo não pode ser vazia ' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Categoria do vídeo não pode ser vazia' })
  category: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
