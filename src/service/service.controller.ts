import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Service } from 'src/entities/service.entity';
import { ServiceService } from './service.service';
import { ServiceDto } from './service.dto';
import { OperationService } from 'src/entities/operation_service.entity';
import { OperationserviceDto } from './operationService.dto';
import { ExternalResourceDto } from './externalResource.dto';
import { ExternalResource } from 'src/entities/external_resource.entity';
import { CommunicationDto } from './communication.dto';

@Controller('modulos/:mid/servicos')
export class ServiceController {

    constructor(private serviceService: ServiceService){}

    @Get()
    findAll(@Param('mid') moduleId: number): Promise<Service[]> {
        return this.serviceService.findAll(moduleId);
    }

    @Post()
    async create(@Body() serviceDto: ServiceDto, 
           @Param('sid') systemId: number) {
        return this.serviceService.create(serviceDto, systemId);
    }

    @Get('/:sid/operations')
    async findOperations(@Param('sid') serviceId: number): Promise<OperationService[]> {
        return this.serviceService.findOperations(serviceId);
    }

    @Post('/:sid/operations')
    async createOperation(@Body() operationServiceDto: OperationserviceDto, 
           @Param('sid') systemId: number) {
        return this.serviceService.createOperation(operationServiceDto, systemId);
    }


    @Get('/:sid/externalResources')
    async findExternalResources(@Param('sid') serviceId: number): Promise<ExternalResource[]> {
        return this.serviceService.findExternalResources(serviceId);
    }

    @Post('/:sid/externalResources')
    async createExternalResource(@Body() externalResourcesDto: ExternalResourceDto, 
           @Param('sid') serviceId: number) {
        return this.serviceService.createExternalResource(externalResourcesDto, serviceId);
    }

    @Get('/:sid/communications')
    async findCommunications(@Param('sid') serviceId: number) {
        return this.serviceService.findCommunications(serviceId);
    }

    @Post('/:sid/communications/:rid')
    async createCommunication(
        @Param('sid') serviceId: number,
        @Param('rid') receiverId: number,
        @Body() communicationdDto: CommunicationDto
    ) {
        return this.serviceService.createCommunication(communicationdDto, serviceId, receiverId);
    }
}