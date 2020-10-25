import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { System } from '../entities/system.entity';
import { SystemService } from './system.service';
import { SystemDto } from './system.dto';
import { NotFuncReq } from 'src/entities/notFuncReq.entity';
import { NotFuncReqDto } from './notFuncReq.dto';

@Controller('sistema')
export class SystemController {

    constructor(private systemService: SystemService){}

    @Get()
    findAll(): Promise<System[]> {
        return this.systemService.findAll();
    }

    @Post()
    create(@Body() createSystemDto: SystemDto) {
        return this.systemService.create(createSystemDto);
    }

    @Get('/:sid/non-func-reqs')
    async findAllNonReqFunc(@Param("sid") systemId: number): Promise<NotFuncReq[]> {
        return await this.systemService.findAllNonReqFunc(systemId);
    }

    @Post('/:sid/non-func-reqs')
    async createNonReqFunc(@Body() notFuncReqDto: NotFuncReqDto, 
           @Param("sid") systemId: number) {
        return this.systemService.createNonReqFunc(notFuncReqDto, systemId);
    }
}
