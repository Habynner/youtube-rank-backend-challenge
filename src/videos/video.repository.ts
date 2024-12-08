import { Injectable } from '@nestjs/common';
import { VideoEntity } from './entities/video.entity';

@Injectable()
export class VideoRepository {
  private videos: VideoEntity[] = [];

  listaTodos() {
    return this.videos;
  }

  salva(dadosVideo: VideoEntity) {
    this.videos.push(dadosVideo);
    return dadosVideo;
  }

  private buscaPorId(id: string) {
    const possivelVideo = this.videos.find((video) => video.id === id);

    if (!possivelVideo) {
      throw new Error('Vídeo não existe');
    }

    return possivelVideo;
  }

  async findAndCount({
    skip = 0,
    take = 10,
    order = { createdAt: 'ASC' },
  }: {
    skip?: number;
    take?: number;
    order?: { [key in keyof VideoEntity]?: 'ASC' | 'DESC' };
  }): Promise<[VideoEntity[], number]> {
    // Ordenação
    const orderedVideos = this.videos.sort((a, b) => {
      const [orderKey, orderDirection] = Object.entries(order)[0];
      const direction = orderDirection === 'ASC' ? 1 : -1;
      if (a[orderKey] < b[orderKey]) return -1 * direction;
      if (a[orderKey] > b[orderKey]) return 1 * direction;
      return 0;
    });

    // Total de registros antes da paginação
    const total = orderedVideos.length;

    // Paginação
    const paginatedVideos = orderedVideos.slice(skip, skip + take);

    return [paginatedVideos, total];
  }

  async atualiza(id: string, dadosVideo: Partial<VideoEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];
    const video = this.buscaPorId(id);
    Object.entries(dadosVideo).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      video[chave] = valor;
    });

    return video;
  }

  async findAlias(alias: string) {
    const possivelVideo = await this.videos.find(
      (video) => video.alias === alias,
    );

    if (!possivelVideo) {
      throw new Error('Vídeo não existe');
    }

    return possivelVideo;
  }

  async remove(id: string) {
    const videoRemovido = this.buscaPorId(id);
    this.videos = this.videos.filter((video) => video.id !== id);
    return videoRemovido;
  }
}
