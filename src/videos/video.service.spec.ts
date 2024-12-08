import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateVideoDTO } from './dto/createVideo.dto';
import { UpdateVideoDTO } from './dto/updateVideo.dto';

describe('VideoService', () => {
  let service: VideoService;
  let repo: Repository<VideoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getRepositoryToken(VideoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VideoService>(VideoService);
    repo = module.get<Repository<VideoEntity>>(getRepositoryToken(VideoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createVideo', () => {
    it('should create a new video', async () => {
      const createVideoDto: CreateVideoDTO = {
        name: 'Test Video',
        alias: 'test-alias',
        userId: '',
        id: '',
        url: '',
        votes: 0,
        description: '',
        category: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      const createdVideo = { ...createVideoDto, id: '1' };

      jest.spyOn(repo, 'save').mockResolvedValue(createdVideo);

      const result = await service.createVideo(createVideoDto);

      expect(result).toEqual(createdVideo);
    });
  });

  describe('updateVideo', () => {
    it('should update an existing video', async () => {
      const updateResult: UpdateResult = {
        raw: [],
        affected: 1,
        generatedMaps: [],
      };
      const id = '1';
      const updateVideoDto: UpdateVideoDTO = {
        name: 'Updated Video',
        userId: '',
        votes: 0,
        description: '',
        category: '',
      };

      jest.spyOn(repo, 'update').mockResolvedValue(updateResult);

      const result = await service.updateVideo(id, updateVideoDto);

      expect(result).toEqual(updateResult);
    });
  });

  describe('deleteVideo', () => {
    it('should delete a video', async () => {
      const deleteResult: DeleteResult = { raw: [], affected: 1 };

      jest.spyOn(repo, 'delete').mockResolvedValue(deleteResult);

      const result = await service.deleteVideo('1');

      expect(result).toEqual(deleteResult);
    });
  });
});
