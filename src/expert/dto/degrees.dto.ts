import { IsDateString, IsOptional, IsString } from 'class-validator';

export class DTODegrees {
  @IsString()
  @IsOptional()
  field: string;

  @IsString()
  @IsOptional()
  academic_degree: string;

  @IsDateString()
  @IsOptional()
  start: Date;

  @IsString()
  @IsOptional()
  end: string;

  @IsString()
  @IsOptional()
  school: string;
}
