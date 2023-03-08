import { IsOptional, IsString } from 'class-validator';

export class DTOPersonalInfo {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  bg_photo: string;

  @IsString()
  @IsOptional()
  picture: string;
}
