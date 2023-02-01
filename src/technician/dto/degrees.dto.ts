import { IsDateString, IsOptional, IsString } from 'class-validator';

export class DTODegrees {
  @IsString()
  @IsOptional()
  field: string;

  @IsString()
  @IsOptional()
  academicDegree: string;

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
