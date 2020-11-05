import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NonFuncReq } from 'src/entities/nonFuncReq.entity';
import { Repository } from 'typeorm';
import { NonFuncReqDto } from './non-func-req.dto';

@Injectable()
export class NonFuncReqService {
  constructor(
    @InjectRepository(NonFuncReq)
    private nonFuncReqRepository: Repository<NonFuncReq>,
  ) {}

  async findAll() {
    return this.nonFuncReqRepository.find();
  }

  async create(nonFuncreqDto: NonFuncReqDto) {
    const nonFuncReq = new NonFuncReq();

    nonFuncReq.nameReq = nonFuncreqDto.req;

    return this.nonFuncReqRepository.save(nonFuncReq);
  }
}
