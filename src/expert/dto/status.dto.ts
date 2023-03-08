import { IsNumber } from 'class-validator';

export class DTOStatus {
  @IsNumber()
  id_exp: number;

  @IsNumber()
  id_status: number;
}
