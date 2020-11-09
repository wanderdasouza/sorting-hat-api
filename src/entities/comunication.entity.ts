import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class Comunication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  sync: boolean;

  @ManyToOne(
    () => Service,
    service => service.service_emitter,
  )
  service_emitter: Service;

  @ManyToOne(
    () => Service,
    service => service.service_receiver,
  )
  service_receiver: Service;
}
