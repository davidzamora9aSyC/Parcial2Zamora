
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, UsingJoinColumnIsNotAllowedError } from 'typeorm';
import { OneToOne } from 'typeorm';
import { ProyectoEntity } from '../../proyecto/proyecto.entity/proyecto.entity';
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
   @JoinColumn()
    proyecto:ProyectoEntity;

}
