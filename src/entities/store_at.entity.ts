import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Database } from "./database.entity";
import { Service } from "./service.entity";

@Entity()
export class Store_At {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    namespace: string;

    @ManyToOne(() => Database, database => database.store_at)
    database: Database;

    @ManyToOne(() => Service, service => service.store_at)
    service: Service;

}