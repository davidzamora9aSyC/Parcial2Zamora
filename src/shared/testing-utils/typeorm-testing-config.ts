/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from '../../profesor/profesor.entity/profesor.entity';
import { EstudianteEntity } from '../../estudiante/estudiante.entity/estudiante.entity';
import { PropuestaEntity } from '../../propuesta/propuesta.entity/propuesta.entity';
import { ProyectoEntity } from '../../proyecto/proyecto.entity/proyecto.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [ProfesorEntity, EstudianteEntity, ProyectoEntity, PropuestaEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([ProfesorEntity, EstudianteEntity, ProyectoEntity, PropuestaEntity]),
];