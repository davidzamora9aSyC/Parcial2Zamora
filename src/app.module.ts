import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfesorModule } from './profesor/profesor.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaEntity } from './propuesta/propuesta.entity/propuesta.entity';
import { ProfesorEntity } from './profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity/proyecto.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';


@Module({
  imports: [     TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'Parcial',
      entities: [PropuestaEntity, ProfesorEntity, ProyectoEntity, EstudianteEntity, ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    ProfesorModule,
    PropuestaModule,
    ProyectoModule,
    EstudianteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
