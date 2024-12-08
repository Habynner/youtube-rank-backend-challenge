import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateVideoDTO {
  @IsOptional()
  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do vídeo não pode ser vazio' })
  @IsOptional()
  name: string;

  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  @IsOptional()
  votes: number;

  @IsString()
  @IsOptional()
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Categoria do vídeo não pode ser vazia' })
  @IsOptional()
  category: string;
}
