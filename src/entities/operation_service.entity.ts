import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class OperationService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  operation: string;

  @ManyToOne(
    () => Service,
    service => service.operations,
  )
  service: Service;
}
