import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DTOSignUp {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsNumber()
  @IsOptional()
  phone?: number;
}

export class SignIn {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  keep_session: boolean;
}

export class AuthGoogle {
  @IsString()
  provider: string;

  @IsString()
  providerId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  picture: string;
}
