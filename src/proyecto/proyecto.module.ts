import { Module } from '@nestjs/common';
import { ProyectoService } from './Proyecto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './Proyecto.entity/Proyecto.entity';
import { ProyectoController } from './proyecto.controller';

@Module({
  providers: [ProyectoService],
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
  controllers: [ProyectoController],
})
export class ProyectoModule {
  constructor(private readonly ProyectoService: ProyectoService) {}
}
