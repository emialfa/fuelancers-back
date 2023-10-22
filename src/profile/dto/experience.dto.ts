import { IsString } from 'class-validator';

export class DTOExperience {
  @IsString()
  id_experience: string;
  @IsString()
  id_exp: string;
}
