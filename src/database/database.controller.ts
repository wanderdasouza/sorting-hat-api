import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseDto } from './database.dto';
import { Store_At } from 'src/entities/store_at.entity';

@Controller('modulos/:mid/servicos/:sid/bds')
export class DatabaseServicesController {

    constructor(private databaseService: DatabaseService){}

    @Get()
    findAllServicesDatabases(@Param('sid') serviceId: number): Promise<Store_At[]> {
        return this.databaseService.findAllServicesDatabases(serviceId);
    }

    @Post()
    createDatabase(
        @Body() createDatabaseDto: DatabaseDto,
        @Param('sid') serviceId: number,
        @Param('mid') moduleId: number
    ) {
        return this.databaseService.create(createDatabaseDto, serviceId, moduleId);
    }

}


@Controller('modulos/:mid/bds')
export class DatabaseModulesController {

    constructor(private databaseService: DatabaseService){}

    @Get()
    findAllModulesDatabases(@Param('mid') moduleId: number) {
        return this.databaseService.findAllModulesDatabases(moduleId);
    }
}