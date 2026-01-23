import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { OrganizationsService } from './organizations.service';
import {
  CreateOrganizationDTO,
  InviteUserToOrgDTO,
  OrganizationDTO,
  UserOrganizationDTO,
} from './dtos/organization.dto';
import { User } from '@/decorators/user';

@Controller({
  path: '/organizations',
})
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationsService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() organization: CreateOrganizationDTO, @User() user) {
    const newOrganization = await this.organizationService.create(
      organization,
      user,
    );

    const payload = plainToInstance(OrganizationDTO, newOrganization);
    return instanceToPlain(payload, { excludeExtraneousValues: true });
  }

  // GET: Get popular organizations

  // UPDATE: Update organization

  // POST: Request to join org

  // POST: Invite user to org
  @Post('invite-user')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async inviteUser(@Body() payload: InviteUserToOrgDTO, @User() user) {
    const organizationMembership = await this.organizationService.inviteUser(
      payload,
      user,
    );

    return organizationMembership;
  }

  @Get('get-organization')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async getOrganization(@Query('organizationId') organizationId: string) {
    if (!organizationId) {
      throw new BadRequestException('No organization ID was provided!');
    }

    const dbOrganization =
      await this.organizationService.getOrganization(organizationId);

    const payload = plainToInstance(UserOrganizationDTO, dbOrganization);
    return instanceToPlain(payload, { excludeExtraneousValues: true });
  }

  // GET: List members

  // UPDATE: Update a member of an org

  // DELETE: Suspend a user from org
}
