import prisma from '@hbasports/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationsRepository {
  async findById(
    organizationId: string,
    options?: Parameters<typeof prisma.organization.findFirst>[0],
  ) {
    const organization = await prisma.organization.findFirst({
      where: {
        organizationId: organizationId,
      },
      ...options,
    });

    if (!organization) {
      return null;
    }
    return organization;
  }

  async findByIdOrThrow({ id }: { id: string }) {
    const organization = await this.findById(id);
    if (!organization) {
      throw new Error(`Organization with id ${id} not found`);
    }
    return organization;
  }

  async findByIds({ ids }: { ids: string[] }) {
    return prisma.organization.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findExistingInvite(userId: string) {
    return await prisma.organizationMember.findFirst({
      where: {
        userId,
      },
    });
  }

  async findInvitedUser(userId: string) {
    return await prisma.user.findFirst({
      where: {
        userId,
      },
    });
  }
}
