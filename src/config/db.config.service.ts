import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { VideoEntity } from 'src/videos/entities/video.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [UserEntity, VideoEntity],
      synchronize: true,
    };
  }
}
