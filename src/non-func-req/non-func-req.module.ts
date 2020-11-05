import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NonFuncReq } from 'src/entities/nonFuncReq.entity';
import { NonFuncReqController } from './non-func-req.controller';
import { NonFuncReqService } from './non-func-req.service';

@Module({
  imports: [TypeOrmModule.forFeature([NonFuncReq])],
  controllers: [NonFuncReqController],
  providers: [NonFuncReqService],
})
export class NonFuncReqModule {}
