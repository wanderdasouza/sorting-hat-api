import { Body, Controller, Get, Post } from '@nestjs/common';
import { System } from '../entities/system.entity';
import { SystemService } from './system.service';
import { SystemDto } from './system.dto';

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
}
