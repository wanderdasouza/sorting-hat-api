import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { ModuleEntity } from '../entities/module.entity';
import { System } from 'src/entities/system.entity';
import { Service } from 'src/entities/service.entity';
import { Communication } from 'src/entities/communication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModuleEntity, System, Service, Communication]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
