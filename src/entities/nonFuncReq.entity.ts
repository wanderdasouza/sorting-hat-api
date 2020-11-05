import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NonFuncReq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameReq: string;
}
