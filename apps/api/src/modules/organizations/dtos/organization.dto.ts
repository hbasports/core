import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsJSON,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ApiResponseUserDTO } from '@/modules/auth/dtos/auth.dto';

export class CreateOrganizationDTO {
  @Expose()
  @IsString({ message: 'Organization name must be a string!' })
  public readonly name: string;

  @Expose()
  @Transform(
    ({ obj }: { obj: CreateOrganizationDTO }) =>
      obj.shortName !== obj.name ? obj.shortName : obj.name,
    { toPlainOnly: true },
  )
  @IsOptional()
  @IsString({ message: 'Organization short name must be a string!' })
  public readonly shortName: string;

  @Expose()
  @IsOptional()
  @IsIn(['RUGBY_LEAGUE', 'CRICKET', 'GRIDIRON'], {
    message: 'Invalid sport type!',
  })
  public readonly sport?: string;

  @IsOptional()
  @IsBoolean({ message: 'Allow public membership must be a boolean!' })
  public readonly allowPublicMembership?: boolean = false; // Whether anyone can request to join

  @Expose()
  @IsOptional()
  @Transform(
    ({ obj }: { obj: CreateOrganizationDTO }) =>
      obj.logoUrl ? obj.logoUrl : undefined,
    {
      toPlainOnly: true,
    },
  )
  @IsUrl({}, { message: 'Logo URL must be a valid URL!' })
  public readonly logoUrl?: string | undefined;

  @Expose()
  @IsOptional()
  @IsString({ message: 'Description must be a string!' })
  public readonly description?: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  founded?: string;
}

export class OrganizationDTO extends CreateOrganizationDTO {
  @Expose()
  @IsOptional()
  @IsString()
  public readonly organizationId?: string;

  @Expose()
  @IsOptional()
  @IsString()
  public readonly slug?: string;

  @Expose()
  @Transform(({ value }: { value: string }) =>
    value
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  )
  public readonly sport?: string;
}

export class UserOrganizationDTO extends OrganizationDTO {
  @Expose()
  @IsJSON()
  public readonly owner: ApiResponseUserDTO;
}

export class InviteUserToOrgDTO {
  @IsString()
  public readonly organizationId: string;

  @IsString()
  public readonly accountId: string;
}
