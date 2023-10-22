import { IsString } from 'class-validator';

export class DTOSkill {
  @IsString()
  id_exp: string;

  @IsString()
  id_skill: string;
}
