import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModuleEntity } from './module.entity';
import { NonFuncReq } from './nonFuncReq.entity';

@Entity()
export class System {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => NonFuncReq)
  @JoinTable()
  nonFuncReqs: NonFuncReq[];

  @OneToMany(
    () => ModuleEntity,
    module => module.system,
  )
  modules: ModuleEntity[];
}
