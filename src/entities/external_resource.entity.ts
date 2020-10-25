import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./service.entity";

@Entity()
export class ExternalResource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    externalResource: string;

    @ManyToOne(() => Service, service => service.externalResources)
    service: Service;
}