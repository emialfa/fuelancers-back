import { IsString } from 'class-validator';

export class DTOStatus {
  @IsString()
  id_exp: number;

  @IsString()
  id_status: number;
}
