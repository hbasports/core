import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'Username must be a string.' })
  @Length(3, 30, { message: 'Username must be between 3 and 30 characters.' })
  public readonly username: string;

  @IsEmail({}, { message: 'Invalid email address.' })
  public readonly email: string;

  @IsString({ message: 'Password must be a string.' })
  @Length(8, 150, { message: 'Password must be between 8 and 150 characters.' })
  public readonly password: string;
}
