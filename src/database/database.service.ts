import { Injectable } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Database } from 'src/entities/database.entity';
import { ModuleEntity } from 'src/entities/module.entity';
import { Service } from 'src/entities/service.entity';
import { Store_At } from 'src/entities/store_at.entity';
import { Repository } from 'typeorm';
import { DatabaseDto } from './database.dto';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Database)
    private databaseRepository: Repository<Database>,
    @InjectRepository(Store_At)
    private storeAtRepository: Repository<Store_At>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async findAllServicesDatabases(serviceId: number): Promise<Store_At[]> {
    return await this.storeAtRepository.find({
      where: { service: { id: serviceId } },
      relations: ['database'],
    });
  }

  async create(
    databaseDto: DatabaseDto,
    serviceId: number,
    moduleId: number,
  ): Promise<Database> {
    const service = await this.serviceRepository.findOne(serviceId);
    const module = await this.moduleRepository.findOne(moduleId, {
      relations: ['databases'],
    });

    let database = new Database();
    database.function = databaseDto.function;
    database.model = databaseDto.model;
    database = await this.databaseRepository.save(database);

    const storeAt = new Store_At();
    storeAt.namespace = databaseDto.namespace;
    storeAt.service = service;
    storeAt.database = database;
    await this.storeAtRepository.save(storeAt);

    module.databases.push(database);
    await this.moduleRepository.save(module);

    return database;
  }

  async findAllModulesDatabases(moduleId: number) {
    return await (
      await this.moduleRepository.findOne(moduleId, {
        relations: ['databases'],
      })
    ).databases;
  }
}
