/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { CreateOrganizationDTO } from '../dtos/organization.dto';
import { OrganizationsService } from '../organizations.service';

jest.mock('@hbasports/prisma', () => ({
  prisma: {
    organization: {
      create: jest.fn(),
    },
  },
}));

jest.mock('@/lib/string', () => ({
  slugify: jest.fn(),
}));

import { prisma } from '@hbasports/prisma';
import { slugify } from '@/lib/string';
import { AuthenticatedUser } from '@/modules/auth/strategies/auth.strategy';
import { OrganizationsRepository } from '../organization.repository';

describe('OrganizationService', () => {
  let service: OrganizationsService;
  let logger: Logger;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        OrganizationsRepository,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an organization and return the data', async () => {
    const mockAuthenticatedUser: AuthenticatedUser = {
      userId: 'e515d5a4-ac6a-410b-9958-88325cfe0b67',
      email: 'test@example.com',
      role: 'USER',
    };

    const mockOrganization: CreateOrganizationDTO = {
      name: 'National Rugby League',
      shortName: 'NRL',
      sport: 'rugby-league',
      allowPublicMembership: false,
      description: 'The highest level of Rugby League in Australia.',
      founded: '2025-01-01T00:00:00.000Z',
    };

    const mockCreatedOrganization = {
      organizationId: 'org-123',
      slug: 'national-rugby-league',
      name: 'National Rugby League',
      shortName: 'NRL',
      sport: 'Rugby League',
      description: 'The highest level of Rugby League in Australia.',
    };

    (slugify as jest.Mock).mockReturnValue('national-rugby-league');

    (prisma.organization.create as jest.Mock).mockResolvedValue(
      mockCreatedOrganization,
    );

    const result = await service.create(
      mockOrganization,
      mockAuthenticatedUser,
    );

    expect(prisma.organization.create).toHaveBeenCalledWith({
      data: {
        ...mockOrganization,
        slug: 'national-rugby-league',
        sport: 'RUGBY_LEAGUE',
        founded: expect(Date),
        owner: { connect: { userId: mockAuthenticatedUser.userId } },
      },
    });

    expect(logger.log).toHaveBeenCalled();
    expect(result).toEqual(mockCreatedOrganization);
  });
});
