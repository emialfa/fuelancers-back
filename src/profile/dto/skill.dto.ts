import { IsArray, IsString } from 'class-validator';

export class DTOSkill {
  @IsString()
  id_exp: string;

  @IsArray()
  id_skills: string[];
}
