
/* eslint-disable prettier/prettier */
/* archivo: src/museum/museum.entity.ts */
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';

@Entity()
export class ProfesorEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   name: string;
   @Column()
   cedula: number;
   @Column()
   grupoInvestigacion: string;
   @Column()
   numeroExtension: number;

   @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
    propuestas:PropuestaEntity[];

}
