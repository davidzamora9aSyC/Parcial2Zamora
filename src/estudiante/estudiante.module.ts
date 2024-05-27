import { Module } from '@nestjs/common';
import { EstudianteService } from './Estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './Estudiante.entity/Estudiante.entity';
import { EstudianteController } from './estudiante.controller';
import { ProyectoEntity } from '../proyecto/proyecto.entity/proyecto.entity';

@Module({
  providers: [EstudianteService],
  imports: [TypeOrmModule.forFeature([EstudianteEntity, ProyectoEntity])],
  controllers: [EstudianteController],
})
export class EstudianteModule {
  constructor(private readonly EstudianteService: EstudianteService) {}
}
