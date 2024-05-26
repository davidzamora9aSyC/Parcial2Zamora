import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GestorModule } from './gestor/gestor.module';
import { ClienteModule } from './cliente/cliente.module';
import { ReporteModule } from './reporte/reporte.module';
import {TransferenciaModule} from './transferencia/transferencia.module';
import { TemaEducativoModule } from './tema-educativo/tema-educativo.module';
import { RecursoEducativoModule } from './recurso-educativo/recurso-educativo.module';
import { ClienteReporteModule } from './cliente-reporte/cliente-reporte.module';
import { GestorReporteModule } from './gestor-reporte/gestor-reporte.module';
import { ClienteTransferenciaModule } from './cliente-transferencia/cliente-transferencia.module';
import { TemaeducativoRecursoeducativoModule } from './temaeducativo-recursoeducativo/temaeducativo-recursoeducativo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MuseumService } from './museum/museum.service';
import { MuseumModule } from './museum/museum.module';
import { ArtworkModule } from './artwork/artwork.module';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { MuseumArtworkModule } from './museum-artwork/museum-artwork.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorPropuestaModule } from './profesor-propuesta/profesor-propuesta.module';
import { ProyectoPropuestaModule } from './proyecto-propuesta/proyecto-propuesta.module';
import { ProyectoEstudianteModule } from './proyecto-estudiante/proyecto-estudiante.module';
import { PropuestaEntity } from './propuesta/propuesta.entity/propuesta.entity';
import { ProfesorEntity } from './profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity/proyecto.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { ArtworkEntity } from './artwork/artwork.entity/artwork.entity';
import { ExhibitionEntity } from './exhibition/exhibition.entity/exhibition.entity';
import { SponsorEntity } from './sponsor/sponsor.entity/sponsor.entity';

@Module({
  imports: [GestorModule, ClienteModule, ReporteModule, TransferenciaModule, TemaEducativoModule, RecursoEducativoModule,
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'Parcial',
      entities: [PropuestaEntity, ProfesorEntity, ProyectoEntity, EstudianteEntity, ArtworkEntity, ExhibitionEntity, SponsorEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    ClienteReporteModule,
    GestorReporteModule,
    ClienteTransferenciaModule,
    TemaeducativoRecursoeducativoModule,
    UserModule,
    AuthModule,
    MuseumModule,
    ArtworkModule,
    ExhibitionModule,
    SponsorModule,
    MuseumArtworkModule,
    ProfesorModule,
    PropuestaModule,
    ProyectoModule,
    EstudianteModule,
    ProfesorPropuestaModule,
    ProyectoPropuestaModule,
    ProyectoEstudianteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
