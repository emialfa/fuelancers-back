import { IsOptional, IsString } from 'class-validator';

export class DTOBasicData {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  slogan: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  id_status: string;

  @IsString()
  @IsOptional()
  bg_photo: string;

  @IsString()
  @IsOptional()
  picture: string;
}
