import { Module } from '@nestjs/common';
import { PropuestaService } from './Propuesta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from './Propuesta.entity/Propuesta.entity';
import { PropuestaController } from './propuesta.controller';
import { ProyectoEntity } from '../proyecto/proyecto.entity/proyecto.entity';


@Module({
  providers: [PropuestaService],
  imports: [TypeOrmModule.forFeature([PropuestaEntity, ProyectoEntity])],
  controllers: [PropuestaController],
})
export class PropuestaModule {
  constructor(private readonly PropuestaService: PropuestaService) {}
}
