import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemDto } from './system.dto';
import { System } from '../entities/system.entity';
import { NonFuncReq } from 'src/entities/nonFuncReq.entity';
import { NonFuncReqDto } from './non-func-req.dto';

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
    return this.systemRepository.find({ relations: ['nonFuncReqs'] });
  }

  async create(systemDto: SystemDto): Promise<System> {
    const nonfuncReqs = await this.nonFuncReqRepository.findByIds(
      systemDto.reqIds,
    );

    const system = new System();
    system.name = systemDto.name;
    system.description = systemDto.description;
    system.nonFuncReqs = nonfuncReqs;

    return this.systemRepository.save(system);
  }

  async findAllNonFuncReqs() {
    return this.nonFuncReqRepository.find();
  }

  async createNonFuncReq(nonFuncreqDto: NonFuncReqDto) {
    const nonFuncReq = new NonFuncReq();

    nonFuncReq.nameReq = nonFuncreqDto.req;

    return this.nonFuncReqRepository.save(nonFuncReq);
  }
}
