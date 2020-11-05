import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemController } from './system.controller';
import { System } from '../entities/system.entity';
import { SystemService } from './system.service';
import { NonFuncReq } from 'src/entities/nonFuncReq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([System, NonFuncReq])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
