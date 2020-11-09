import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Database } from './database.entity';
import { Service } from './service.entity';
import { System } from './system.entity';

@Entity()
export class ModuleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  responsibility: string;

  @ManyToOne(
    () => System,
    system => system.modules,
  )
  system: System;

  @ManyToMany(() => Database)
  @JoinTable()
  databases: Database[];

  @ManyToMany(() => ModuleEntity)
  @JoinTable()
  moduleInteracting: ModuleEntity[];

  @OneToMany(
    () => Service,
    service => service.module,
  )
  services: Service[];
}
