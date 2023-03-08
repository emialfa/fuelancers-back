import { IsNumber } from 'class-validator';

export class DTOExperience {
  @IsNumber()
  id_experience: number;
  @IsNumber()
  id_exp: number;
}
