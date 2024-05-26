import { IsString, IsDate, IsUUID, IsOptional, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class ProyectoDto {
    @IsDate()
    @Type(() => Date)
    fechaInicio: Date;

    @IsDate()
    @Type(() => Date)
    fechaFin: Date;

    @IsUrl()
    url: string;

    @IsOptional()
    @IsUUID()
    estudianteId?: string;

    @IsOptional()
    @IsUUID()
    propuestaId?: string;
}
