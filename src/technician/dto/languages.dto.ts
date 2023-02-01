import { IsString } from 'class-validator';

export class DTOLanguages {
  @IsString()
  language: string;

  @IsString()
  id_language: string;

  @IsString()
  proficiency: string;

  @IsString()
  id_proficiency: string;
}
