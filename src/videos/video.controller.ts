import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { UpdateVideoDTO } from './dto/updateVideo.dto';
import { CreateVideoDTO } from './dto/createVideo.dto';
import { VideoRepository } from './video.repository';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly videoService: VideoService,
  ) {}

  @Post()
  async criaNovo(@Body() createVideoDto: CreateVideoDTO) {
    const videoCadastrado = await this.videoService.createVideo(createVideoDto);
    return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comHeader({
        Location: `/videos/${videoCadastrado.name}`,
      })
      .comBody(videoCadastrado)
      .build();
  }

  @Get()
  async listaTodos() {
    return this.videoService.videosList();
  }

  @Get('findVideos')
  async find(@Query('page') page: number, @Query('limit') limit: number) {
    return this.videoService.findVideos(page, limit);
  }

  @Get('validar/:alias')
  async validar(@Param('alias') alias: string) {
    const video = await this.videoService.buscaPorAlias(alias);
    return { valido: !video || video.alias !== alias };
  }

  @Put('/:id')
  async atualiza(@Param('id') id: string, @Body() videoEntity: UpdateVideoDTO) {
    const videoAlterado = await this.videoService.updateVideo(id, videoEntity);

    return {
      mensagem: 'vídeo atualizado com sucesso',
      video: videoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const videoRemovido = await this.videoService.deleteVideo(id);

    return {
      mensagem: 'vídeo removido com sucesso',
      video: videoRemovido,
    };
  }
}
