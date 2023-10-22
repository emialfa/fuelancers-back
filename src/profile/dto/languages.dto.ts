import { IsString } from 'class-validator';

export class DTOLanguages {
  @IsString()
  id_exp: number;

  @IsString()
  id_language: number;

  @IsString()
  id_proficiency: number;
}
