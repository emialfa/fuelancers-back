import { IsString } from 'class-validator';

export class DTOSkill {
  @IsString()
  id_exp: number;

  @IsString()
  id_skill: number;
}
