import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModuleEntity } from "./module.entity";
import { NotFuncReq } from "./notFuncReq.entity";

@Entity()
export class System {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;


    @OneToMany(() => NotFuncReq, notFuncReq => notFuncReq.system)
    notFuncReqs: NotFuncReq[];

    @OneToMany(() => ModuleEntity, module => module.system)
    modules: ModuleEntity[];
}