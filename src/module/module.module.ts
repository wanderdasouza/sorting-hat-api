import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import { ModuleEntity } from '../entities/module.entity';
import { System } from 'src/entities/system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity, System])],
  controllers: [ModuleController],
  providers: [ModuleService]
})
export class ModuleModule {}
