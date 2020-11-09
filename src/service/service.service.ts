import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalResource } from 'src/entities/external_resource.entity';
import { ModuleEntity } from 'src/entities/module.entity';
import { OperationService } from 'src/entities/operation_service.entity';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { OperationserviceDto } from './operationService.dto';
import { ServiceDto } from './service.dto';
import { ExternalResourceDto } from './externalResource.dto';
import { CommunicationDto } from './communication.dto';
import { Comunication } from 'src/entities/comunication.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(OperationService)
    private operationsServiceRepository: Repository<OperationService>,
    @InjectRepository(ExternalResource)
    private externalResourceRepository: Repository<ExternalResource>,
    @InjectRepository(Comunication)
    private communicationRepository: Repository<Comunication>,
  ) {}

  async findAll(moduleId: number): Promise<Service[]> {
    const services = await this.serviceRepository.find({
      module: { id: moduleId },
    });
    return services;
  }

  @Post()
  async create(serviceDto: ServiceDto, moduleId: number): Promise<Service> {
    const module = await this.moduleRepository.findOne(moduleId);
    const service = new Service();
    service.name = serviceDto.name;
    service.responsibility = serviceDto.responsibility;
    service.module = module;

    return this.serviceRepository.save(service);
  }

  async findOperations(serviceId: number): Promise<OperationService[]> {
    return this.operationsServiceRepository.find({
      service: { id: serviceId },
    });
  }

  async createOperation(
    operationServiceDto: OperationserviceDto,
    serviceId: number,
  ) {
    const service = await this.serviceRepository.findOne(serviceId);
    const operation = new OperationService();
    operation.operation = operationServiceDto.name;
    operation.service = service;
    return this.operationsServiceRepository.save(operation);
  }

  async findExternalResources(serviceId: number): Promise<ExternalResource[]> {
    return this.externalResourceRepository.find({ service: { id: serviceId } });
  }

  async createExternalResource(
    externalResourceDto: ExternalResourceDto,
    serviceId: number,
  ) {
    const service = await this.serviceRepository.findOne(serviceId);
    const externalResource = new ExternalResource();
    externalResource.externalResource = externalResourceDto.name;
    externalResource.service = service;
    return this.externalResourceRepository.save(externalResource);
  }

  async findCommunications(serviceId: number) {
    return this.communicationRepository.find({
      service_emitter: { id: serviceId },
    });
  }

  async createCommunication(
    communicationDto: CommunicationDto,
    serviceId: number,
    receiverId: number,
  ) {
    const emitter = await this.serviceRepository.findOne(serviceId, {
      relations: ['module'],
    });
    const receiver = await this.serviceRepository.findOne(receiverId, {
      relations: ['module'],
    });

    const moduleEmitter = await this.moduleRepository.findOne(
      emitter.module.id,
      { relations: ['moduleInteracting'] },
    );
    const moduleReceiver = await this.moduleRepository.findOne(
      receiver.module.id,
      { relations: ['moduleInteracting'] },
    );

    if (moduleEmitter.moduleInteracting === undefined) {
      moduleEmitter.moduleInteracting = [moduleReceiver];
    } else {
      moduleEmitter.moduleInteracting.push(moduleReceiver);
    }
    await this.moduleRepository.save(moduleEmitter);

    const communication = new Comunication();
    communication.label = communicationDto.label;
    communication.sync = communicationDto.sync;
    communication.service_emitter = emitter;
    communication.service_receiver = receiver;

    return this.communicationRepository.save(communication);
  }
}
