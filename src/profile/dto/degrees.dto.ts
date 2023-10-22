import { IsOptional, IsString } from 'class-validator';

export class DTODegrees {
  @IsString()
  @IsOptional()
  field: string;

  @IsString()
  @IsOptional()
  academicDegree: string;

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
