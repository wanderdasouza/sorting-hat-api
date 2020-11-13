import { Body, Controller, Get, Post } from '@nestjs/common';
import { System } from '../entities/system.entity';
import { SystemService } from './system.service';
import { SystemDto } from './system.dto';
import { NonFuncReqDto } from './non-func-req.dto';

@Controller('sistema')
export class SystemController {
  constructor(private systemService: SystemService) {}

  @Get()
  findAll(): Promise<System[]> {
    return this.systemService.findAll();
  }

  @Post()
  create(@Body() createSystemDto: SystemDto) {
    return this.systemService.create(createSystemDto);
  }

  @Get('/non-func-reqs')
  async findAllNonFuncReqs() {
    return this.systemService.findAllNonFuncReqs();
  }

  @Post('/non-func-reqs')
  async createnonFuncReq(@Body() nonFuncReqDto: NonFuncReqDto) {
    return this.systemService.createNonFuncReq(nonFuncReqDto);
  }
}
