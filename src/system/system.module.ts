import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemController } from './system.controller';
import { System } from '../entities/system.entity';
import { SystemService } from './system.service';
import { NotFuncReq } from 'src/entities/notFuncReq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([System, NotFuncReq])],
  controllers: [SystemController],
  providers: [SystemService]
})
export class SystemModule {
}
