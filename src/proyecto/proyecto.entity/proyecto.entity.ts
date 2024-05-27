

import { EstudianteEntity } from '../../estudiante/estudiante.entity/estudiante.entity';
import { PropuestaEntity } from '../../propuesta/propuesta.entity/propuesta.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';

@Entity()
export class ProyectoEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   fechaInicio: Date;

   @Column()
   fechaFin: Date;

   @Column()
   url: string;

   
   @OneToOne(() => EstudianteEntity, estudiante => estudiante.proyecto)
    estudiante:EstudianteEntity;

    @OneToOne(() => PropuestaEntity, propuesta => propuesta.proyecto)
    propuesta:PropuestaEntity;


}
