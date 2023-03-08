import { IsOptional, IsString } from 'class-validator';

export class ListDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  iso: string;
  @IsOptional()
  @IsString()
  flag: string;
}
