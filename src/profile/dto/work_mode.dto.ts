import { IsString } from 'class-validator';

export class DTOWorkMode {
  @IsString()
  id_work_mode: string;
  @IsString()
  id_exp: string;
}
