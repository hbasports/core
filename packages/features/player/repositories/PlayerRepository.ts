import { Prisma, PrismaClient, $Enums } from "@hbasports/prisma/client.js";

import { getCountryDataFromCountryString } from "@hbasports/lib/country";

export class PlayerRepository {
  constructor(private prismaClient: PrismaClient) {}

  async create(
    data: Omit<Prisma.PlayerCreateInput, "birthDetails"> & {
      birthDetails: {
        date: Date | string;
        gender: $Enums.Gender;
        location: {
          city?: string;
          state?: string;
          country: string;
        };
      };
    }
  ) {
    const countryData = getCountryDataFromCountryString(
      data.birthDetails.location.country as unknown as string
    );

    const player = await this.prismaClient.player.create({
      data: {
        fullName: data.fullName,
        biometricData: data.biometricData,
        birthDetails: {
          date: data.birthDetails.date,
          gender: data.birthDetails.gender,
          location: {
            city: data.birthDetails.location.city ?? "",
            state: data.birthDetails.location.state ?? "",
            country: countryData,
          },
        },
        relations: data.relations || {},
      },
    });

    return player;
  }

  async findById(playerId: string) {
    const player = await this.prismaClient.player.findUnique({
      where: {
        playerId: playerId,
      },
      select: {
        playerId: true,
        fullName: true,
        biometricData: true,
        birthDetails: true,
        relations: true,
      }
    });

    return player;
  }
}
