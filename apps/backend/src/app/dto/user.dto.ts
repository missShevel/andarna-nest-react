import { IsEmail, MaxLength } from 'class-validator';

export class createUserDto {
  @MaxLength(30)
  firstName: string;
  @MaxLength(30)
  lastName: string;
  @IsEmail()
  email: string;
  password: string;
}
