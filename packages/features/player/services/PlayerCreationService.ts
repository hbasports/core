import { prisma } from "@hbasports/prisma/client";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { $Enums } from "@hbasports/prisma/client.js";

interface CreatePlayerInput {
  fullName: {
    firstName: {
      preferred?: string;
      legal: string;
    };
    middleNames?: string[];
    lastName: string;
  };
  birthDetails: {
    date: Date | string;
    gender: $Enums.Gender;
    location: {
      city?: string;
      state?: string;
      country: string
    };
  };
  biometricData: {
    weightKg: number,
    heightCm: number,
  }
}

export class PlayerCreationService {
  static async createPlayer(data: CreatePlayerInput) {
    const playerRepo = new PlayerRepository(prisma)
    const player = await playerRepo.create(data)

    return player
  }
}
