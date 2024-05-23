

import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
@Entity()
export class EstudianteEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   nombre: string;

   @Column()
   codigoEstudiante: string;

   @Column()
   numCredsAprovados: number;

   
   @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
    proyecto:ProyectoEntity;



}
