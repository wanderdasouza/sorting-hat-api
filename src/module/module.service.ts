import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Communication } from 'src/entities/communication.entity';
import { ModuleEntity } from 'src/entities/module.entity';
import { Service } from 'src/entities/service.entity';
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
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Communication)
    private communicationRepository: Repository<Communication>,
  ) {}

  async findAll(systemId: number) {
    return await this.moduleRepository.find({
      system: { id: systemId },
    });
  }

  async create(moduleDto: ModuleDto, systemId: number): Promise<ModuleEntity> {
    const system = await this.systemRepository.findOne(systemId);
    const module = new ModuleEntity();
    module.name = moduleDto.name;
    module.responsibility = moduleDto.responsibility;
    module.system = system;
    module.databases = [];
    //module.moduleInteracting = [];
    return this.moduleRepository.save(module);
  }

  async findCommunications() {
    return await this.moduleRepository.find({
      relations: ['moduleInteracting'],
    });
  }
}
