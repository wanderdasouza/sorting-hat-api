import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from 'src/entities/database.entity';
import { ModuleEntity } from 'src/entities/module.entity';
import { Service } from 'src/entities/service.entity';
import { Store_At } from 'src/entities/store_at.entity';
import { DatabaseServicesController, DatabaseModulesController } from './database.controller';
import { DatabaseService } from './database.service';

@Module({
  imports: [TypeOrmModule.forFeature([Database, Store_At, Service, ModuleEntity])],
  controllers: [DatabaseServicesController, DatabaseModulesController],
  providers: [DatabaseService]
})
export class DatabaseModule {}
