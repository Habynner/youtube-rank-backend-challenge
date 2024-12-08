import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoDTO } from './dto/createVideo.dto';
import { VideoListDTO } from './dto/videosList.dto';
import { UpdateVideoDTO } from './dto/updateVideo.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videosRepo: Repository<VideoEntity>,
  ) {}

  async createVideo(videoEntity: CreateVideoDTO) {
    return await this.videosRepo.save(videoEntity);
  }

  async videosList() {
    const savedProdutcs = await this.videosRepo.find();
    const productsList = savedProdutcs.map(
      (prod) =>
        new VideoListDTO(
          prod.id,
          prod.userId,
          prod.alias,
          prod.name,
          prod.url,
          prod.votes,
          prod.description,
          prod.category,
        ),
    );

    return productsList;
  }

  async buscaPorAlias(alias: string) {
    return await this.videosRepo.findOne({
      where: { alias: alias },
    });
  }

  async findVideos(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [videos, total] = await this.videosRepo.findAndCount({
      skip,
      take: limit,
      order: { votes: 'DESC' },
    });

    return {
      videos,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async updateVideo(id: string, videoEntity: UpdateVideoDTO) {
    return await this.videosRepo.update(id, videoEntity);
  }

  async deleteVideo(id: string) {
    return await this.videosRepo.delete(id);
  }
}
