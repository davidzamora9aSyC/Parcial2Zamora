import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class EstudianteDto {
    @IsString()
    nombre: string;

    @IsString()
    codigoEstudiante: string;

    @IsNumber()
    numCredsAprovados: number;

}
