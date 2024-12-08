import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { VideoController } from './video.controller';
import { VideoRepository } from './video.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { VideoService } from './video.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity]), UserModule],
  controllers: [VideoController],
  providers: [VideoRepository, VideoService],
})
export class VideoModule {}
