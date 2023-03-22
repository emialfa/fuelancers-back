import { IsNumber } from 'class-validator';

export class DTOSkill {
  @IsNumber()
  id_exp: number;

  @IsNumber()
  id_skill: number;
}
