import { IsNumber, IsString } from 'class-validator';

export class CategorieDegreeDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
