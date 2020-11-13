import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ModuleEntity } from 'src/entities/module.entity';
import { ModuleDto } from './module.dto';
import { ModuleService } from './module.service';

@Controller('systems/:sid/modules')
export class ModuleController {
  constructor(private moduleService: ModuleService) {}

  @Get()
  async findAll(@Param('sid') systemId: number): Promise<ModuleEntity[]> {
    return await this.moduleService.findAll(systemId);
  }

  @Post()
  async create(@Body() moduleDto: ModuleDto, @Param('sid') systemId: number) {
    return this.moduleService.create(moduleDto, systemId);
  }

  @Get('/communications')
  async findCommunications() {
    return this.moduleService.findCommunications();
  }
}
