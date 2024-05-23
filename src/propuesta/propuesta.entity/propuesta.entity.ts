


import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOne } from 'typeorm';
import { ManyToOne } from 'typeorm';

@Entity()
export class PropuestaEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   titulo: string;

   @Column()
   descripcion: string;
   @Column()
   palabraClave: string;
   
   @ManyToOne(() => ProfesorEntity, profesor => profesor.propuestas)
    profesor:ProfesorEntity;

    @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
    proyecto:ProyectoEntity;


}
