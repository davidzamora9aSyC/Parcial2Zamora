import { Module } from '@nestjs/common';
import { EstudianteService } from './Estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './Estudiante.entity/Estudiante.entity';

@Module({
  providers: [EstudianteService],
  imports: [TypeOrmModule.forFeature([EstudianteEntity])],
})
export class EstudianteModule {
  constructor(private readonly EstudianteService: EstudianteService) {}
}
