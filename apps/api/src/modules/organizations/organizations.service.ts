import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { slugify } from '@/lib/string';
import { prisma } from '@hbasports/prisma';
import { Sports } from '@hbasports/prisma/generated/prisma';

import { OrganizationsRepository } from './organization.repository';
import {
  CreateOrganizationDTO,
  InviteUserToOrgDTO,
} from './dtos/organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly logger: Logger,
    private readonly organizationRepository: OrganizationsRepository,
  ) {}

  async create(
    organization: CreateOrganizationDTO,
    user: Partial<{ userId: string }>,
  ) {
    const ownerId = user.userId;
    const sportToPrismaEnum = organization.sport
      .toUpperCase()
      .replace(/-/g, '_');

    const newOrganization = await prisma.organization.create({
      data: {
        ...organization,
        slug: slugify(organization.name),
        sport: Sports[sportToPrismaEnum as keyof typeof Sports],
        founded: organization.founded ? new Date(organization.founded) : null,
        owner: {
          connect: { userId: ownerId },
        },
      },
    });

    this.logger.log(
      `A new organization was created with slug: ${newOrganization.slug}`,
    );

    return newOrganization;
  }

  async inviteUser(
    payload: InviteUserToOrgDTO,
    user: Partial<{ userId: string }>,
  ) {
    const [organization, invitedUser, existingInvite] = await Promise.all([
      this.organizationRepository.findById(payload.organizationId),
      this.organizationRepository.findInvitedUser(payload.accountId),
      this.organizationRepository.findExistingInvite(payload.accountId),
    ]);

    if (!invitedUser) {
      throw new NotFoundException(
        'Invited user ID does not match any records!',
      );
    }

    if (invitedUser.locked) {
      throw new ConflictException('User is banned and cannot be invited.');
    }

    if (invitedUser.userId == user.userId) {
      throw new BadRequestException(
        'You cannot invite yourself to an organization!',
      );
    }
    if (!organization) {
      throw new NotFoundException(
        'Organization ID does not match any organizations!',
      );
    }

    if (organization.ownerId != user.userId) {
      throw new ForbiddenException(
        'You are not the owner of this organization!',
      );
    }

    if (existingInvite) {
      throw new ConflictException(
        'This user has already been invited to this organization!',
      );
    }

    const organizationMember = await prisma.organizationMember.create({
      data: {
        user: {
          connect: { userId: payload.accountId },
        },
        organization: {
          connect: { organizationId: payload.organizationId },
        },
        requester: 'OWNER',
      },
    });

    return organizationMember;
  }

  async getOrganization(organizationId: string) {
    const options = {
      include: {
        owner: {
          select: {
            userId: true,
            username: true,
            slug: true,
          },
        },
      },
    };

    const organization = await this.organizationRepository.findById(
      organizationId,
      options,
    );

    if (!organization) {
      throw new NotFoundException(
        'No organization was found! Please try again with a different ID!',
      );
    }

    return organization;
  }
}
