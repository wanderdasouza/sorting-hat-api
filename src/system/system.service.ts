import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemDto } from './system.dto';
import { NotFuncReqDto } from './notFuncReq.dto';
import { System } from '../entities/system.entity';
import { NotFuncReq } from 'src/entities/notFuncReq.entity';

@Injectable()
export class SystemService {

    constructor(
        @InjectRepository(System) 
        private systemRepository: Repository<System>,
        @InjectRepository(NotFuncReq) 
        private nonFuncReqRepository: Repository<NotFuncReq>
    ){}


    findAll(): Promise<System[]> {
        return this.systemRepository.find();
    }

    create(systemDto: SystemDto): Promise<System>{
        return this.systemRepository.save(systemDto);
    }

    findAllNonReqFunc(systemId: number) {
        return this.nonFuncReqRepository.find({system: {id: systemId}});
    }

    async createNonReqFunc(notFuncReqDto: NotFuncReqDto, systemId: number) {
        const system = await this.systemRepository.findOne(systemId);
        
        const notFuncReq = new NotFuncReq();
        notFuncReq.nameReq = notFuncReqDto.nameReq;
        notFuncReq.system = system;
        return this.nonFuncReqRepository.save(notFuncReq);
    }

}
