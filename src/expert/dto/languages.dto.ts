import { IsNumber } from 'class-validator';

export class DTOLanguages {
  @IsNumber()
  id_language: number;

  @IsNumber()
  id_proficiency: number;
}
