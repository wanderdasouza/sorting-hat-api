import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Communication } from './communication.entity';
import { ExternalResource } from './external_resource.entity';
import { ModuleEntity } from './module.entity';
import { OperationService } from './operation_service.entity';
import { Store_At } from './store_at.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  responsibility: string;

  @ManyToOne(
    () => ModuleEntity,
    module => module.services,
  )
  module: ModuleEntity;

  @OneToMany(
    () => OperationService,
    operation => operation.service,
  )
  operations: OperationService[];

  @OneToMany(
    () => ExternalResource,
    resource => resource.service,
  )
  externalResources: ExternalResource[];
  @OneToMany(
    () => Store_At,
    store_at => store_at.service,
  )
  store_at: Store_At[];

  @OneToMany(
    () => Communication,
    communication => communication.service_emitter,
  )
  service_emitter: Service;

  @OneToMany(
    () => Communication,
    communication => communication.service_receiver,
  )
  service_receiver: Service;
}
