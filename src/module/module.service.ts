import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity } from 'src/entities/module.entity';
import { System } from 'src/entities/system.entity';
import { Repository } from 'typeorm';
import { ModuleDto } from './module.dto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(System)
    private systemRepository: Repository<System>,
  ) {}

  async findAll(systemId: number): Promise<ModuleEntity[]> {
    return await this.moduleRepository.find({ system: { id: systemId } });
  }

  async create(moduleDto: ModuleDto, systemId: number): Promise<ModuleEntity> {
    const system = await this.systemRepository.findOne(systemId);
    const module = new ModuleEntity();
    module.name = moduleDto.name;
    module.responsibility = moduleDto.responsibility;
    module.system = system;
    module.databases = [];
    return this.moduleRepository.save(module);
  }
}
