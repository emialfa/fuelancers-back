import { IsNumber } from 'class-validator';

export class DTOWorkMode {
  @IsNumber()
  id_work_mode: number;
  @IsNumber()
  id_exp: number;
}
