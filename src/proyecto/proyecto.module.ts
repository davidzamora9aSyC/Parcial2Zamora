import { Module } from '@nestjs/common';
import { ProyectoService } from './Proyecto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './Proyecto.entity/Proyecto.entity';

@Module({
  providers: [ProyectoService],
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
})
export class ProyectoModule {
  constructor(private readonly ProyectoService: ProyectoService) {}
}
