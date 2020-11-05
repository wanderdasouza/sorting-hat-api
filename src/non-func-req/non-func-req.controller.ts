import { Body, Controller, Get, Post } from '@nestjs/common';
import { NonFuncReqDto } from './non-func-req.dto';
import { NonFuncReqService } from './non-func-req.service';

@Controller('non-func-reqs')
export class NonFuncReqController {
  constructor(private nonFuncReqService: NonFuncReqService) {}

  @Get()
  async findAll() {
    return this.nonFuncReqService.findAll();
  }

  @Post()
  async create(@Body() nonFuncReqDto: NonFuncReqDto) {
    return this.nonFuncReqService.create(nonFuncReqDto);
  }
}
