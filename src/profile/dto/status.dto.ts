import { IsString } from 'class-validator';

export class DTOStatus {
  @IsString()
  id_exp: string;

  @IsString()
  id_status: string;
}
