import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { System } from "./system.entity";

@Entity()
export class NotFuncReq {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameReq: string;

    @ManyToOne(() => System, system => system.notFuncReqs)
    system: System;
}