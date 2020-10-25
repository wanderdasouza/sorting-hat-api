import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Store_At } from "./store_at.entity";

@Entity()
export class Database {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column({nullable: false})
    function: string;

    @OneToMany(() => Store_At, store_at => store_at.database)
    store_at: Store_At[];
}