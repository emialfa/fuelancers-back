import { IsNumber, IsString } from 'class-validator';

export class DTOServices {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;
}
