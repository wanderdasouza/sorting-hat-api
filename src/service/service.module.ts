import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Communication } from 'src/entities/communication.entity';
import { ExternalResource } from 'src/entities/external_resource.entity';
import { ModuleEntity } from 'src/entities/module.entity';
import { OperationService } from 'src/entities/operation_service.entity';
import { Service } from 'src/entities/service.entity';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Service,
      ModuleEntity,
      OperationService,
      ExternalResource,
      Communication,
    ]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
