import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemDto } from './system.dto';
import { System } from '../entities/system.entity';
import { NonFuncReq } from 'src/entities/nonFuncReq.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private systemRepository: Repository<System>,
    @InjectRepository(NonFuncReq)
    private nonFuncReqRepository: Repository<NonFuncReq>,
  ) {}

  async findAll(): Promise<System[]> {
    const a = await this.systemRepository.find({ relations: ['nonFuncReqs'] });
    console.log(a);
    return this.systemRepository.find({ relations: ['nonFuncReqs'] });
  }

  async create(systemDto: SystemDto): Promise<System> {
    const nonfuncReqs = await this.nonFuncReqRepository.findByIds(
      systemDto.reqIds,
    );

    console.log(nonfuncReqs);
    const system = new System();
    system.name = systemDto.name;
    system.description = systemDto.description;
    system.nonFuncReqs = nonfuncReqs;

    return this.systemRepository.save(system);
  }
}
