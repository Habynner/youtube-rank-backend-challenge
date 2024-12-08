import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { CreateVideoDTO } from './dto/createVideo.dto';
import { UpdateVideoDTO } from './dto/updateVideo.dto';
import { VideoRepository } from './video.repository';

describe('VideoController', () => {
  let videoController: VideoController;
  let videoService: VideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [
        {
          provide: VideoService,
          useValue: {
            createVideo: jest.fn(),
            videosList: jest.fn(),
            findVideos: jest.fn(),
            buscaPorAlias: jest.fn(),
            updateVideo: jest.fn(),
            deleteVideo: jest.fn(),
          },
        },
        VideoRepository,
      ],
    }).compile();

    videoController = module.get<VideoController>(VideoController);
    videoService = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(videoController).toBeDefined();
  });

  describe('criaNovo', () => {
    it('should create a new video and return a response with status CREATED', async () => {
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
      const createdVideo = {
        ...createVideoDto,
        id: '1',
        userId: 'user-id',
        votes: 0,
        category: 'category',
      };

      jest.spyOn(videoService, 'createVideo').mockResolvedValue(createdVideo);

      const response = await videoController.criaNovo(createVideoDto);

      expect(response.body).toEqual(createdVideo);
    });
  });

  describe('listaTodos', () => {
    it('should return a list of all videos', async () => {
      const videoList = [
        {
          id: '1',
          userId: 'user-id',
          alias: 'test-alias-1',
          name: 'Test Video 1',
          url: '',
          votes: 0,
          description: '',
          category: '',
        },
        {
          id: '2',
          userId: 'user-id',
          alias: 'test-alias-2',
          name: 'Test Video 2',
          url: '',
          votes: 0,
          description: '',
          category: '',
        },
      ];

      jest.spyOn(videoService, 'videosList').mockResolvedValue(videoList);

      const result = await videoController.listaTodos();

      expect(result).toEqual(videoList);
    });
  });

  describe('validar', () => {
    it('should return valid response when video alias is not found', async () => {
      const alias = 'test-alias';
      jest.spyOn(videoService, 'buscaPorAlias').mockResolvedValue(null);

      const result = await videoController.validar(alias);

      expect(result).toEqual({ valido: true });
    });
  });

  describe('atualiza', () => {
    it('should update an existing video and return success message', async () => {
      const id = '1';
      const updateVideoDto: UpdateVideoDTO = {
        name: 'Updated Video',
        userId: '',
        votes: 0,
        description: '',
        category: '',
      };

      jest.spyOn(videoService, 'updateVideo').mockResolvedValue({
        generatedMaps: [],
        raw: [],
        affected: 1,
      });

      const result = await videoController.atualiza(id, updateVideoDto);

      expect(result.mensagem).toBe('vídeo atualizado com sucesso');
      expect(result.video).toEqual({
        generatedMaps: [],
        raw: [],
        affected: 1,
      });
    });
  });

  describe('remove', () => {
    it('should remove a video and return success message', async () => {
      const id = '1';
      //   const removedVideo = { id, name: 'Test Video', alias: 'test-alias' };

      jest.spyOn(videoService, 'deleteVideo').mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const result = await videoController.remove(id);

      expect(result.mensagem).toBe('vídeo removido com sucesso');
      expect(result.video).toEqual({
        raw: [],
        affected: 1,
      });
    });
  });
});
