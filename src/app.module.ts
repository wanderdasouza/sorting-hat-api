import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './system/system.module';
import { ModuleModule } from './module/module.module';
import { ServiceModule } from './service/service.module';
import { DatabaseModule } from './database/database.module';
import { NonFuncReqModule } from './non-func-req/non-func-req.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    SystemModule,
    ModuleModule,
    ServiceModule,
    DatabaseModule,
    NonFuncReqModule],
})
export class AppModule {}
