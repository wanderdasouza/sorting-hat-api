import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './system/system.module';
import { ModuleModule } from './module/module.module';
import { ServiceModule } from './service/service.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    SystemModule,
    ModuleModule,
    ServiceModule,
    DatabaseModule],
})
export class AppModule {}
