import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './system/system.module';
import { ModuleModule } from './module/module.module';
import { ServiceModule } from './service/service.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "3306",
      username: "root",
      password: "root",
      database: "test",
      autoLoadEntities: true,
      synchronize: true,
      entities: ["dist/**/**.entity{.ts,.js}"]
    }),
    SystemModule,
    ModuleModule,
    ServiceModule,
    DatabaseModule,
  ],
})
export class AppModule {}


{
    "type": "postgres",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "test",
    "autoLoadEntities": true,
    "synchronize": true,
    "entities": ["dist/**/**.entity{.ts,.js}"]
  }