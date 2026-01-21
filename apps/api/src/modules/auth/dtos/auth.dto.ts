import { IsEmail, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDTO {
  @Expose()
  @IsString({ message: 'Username must be a string.' })
  @Length(3, 30, { message: 'Username must be between 3 and 30 characters.' })
  public readonly username: string;

  @Expose()
  @IsEmail({}, { message: 'Invalid email address.' })
  public readonly email: string;

  @IsString({ message: 'Password must be a string.' })
  @Length(8, 150, { message: 'Password must be between 8 and 150 characters.' })
  public readonly password: string;
}

export class UserDTO extends CreateUserDTO {
  @Expose()
  @IsString()
  public readonly userId: string;

  @Expose()
  @IsString()
  public readonly slug: string;

  @Expose()
  @IsString()
  public readonly rank: string;

  @Expose()
  @IsString()
  public readonly locale?: string;
}

export class ApiResponseUserDTO {
  @Expose()
  @IsString()
  public readonly userId: string;

  @Expose()
  @IsString()
  public readonly username: string;

  @Expose()
  @IsString()
  public readonly slug: string;
}

export class GetTokenDTO {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  @IsString()
  public readonly accountId: string;
}

export class UsernameDTO {
  @IsString()
  public readonly username: string;
}
