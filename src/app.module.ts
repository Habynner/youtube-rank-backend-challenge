import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FitroDeExcecaoHttp } from './common/filters/filter-exeption-http.filter';
import { TransformaResInterceptor } from './core/http/transforma-res.interceptor';
import { VideoModule } from './videos/video.modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    VideoModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FitroDeExcecaoHttp,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformaResInterceptor,
    },
  ],
})
export class AppModule {}
