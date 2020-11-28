import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './system/system.module';
import { ModuleModule } from './module/module.module';
import { ServiceModule } from './service/service.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

console.log(process.env.DATABASE_HOST);
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        ssl: true,
      },
      entities: ['dist/**/**.entity{.ts,.js}'],
    }),
    SystemModule,
    ModuleModule,
    ServiceModule,
    DatabaseModule,
  ],
})
export class AppModule {}
