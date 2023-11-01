import { IsNumber, IsString } from 'class-validator';

export class DTOLocation {
  @IsString()
  name: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
