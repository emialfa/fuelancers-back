import { IsDateString, IsOptional, IsString } from 'class-validator';

export class DTODegrees {
  @IsString()
  @IsOptional()
  field: string;

  @IsString()
  @IsOptional()
  academic_degree: string;

  @IsString()
  @IsOptional()
  start: string;

  @IsString()
  @IsOptional()
  end: string;

  @IsString()
  @IsOptional()
  school: string;
}
