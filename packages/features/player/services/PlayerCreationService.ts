import { prisma } from "@hbasports/prisma/client";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { $Enums } from "@hbasports/prisma/client.js";

enum RelationType {
  DAUGHTER = "daughter",
  SON = "son",
  BROTHER = "brother",
  SISTER = "sister",
  COUSIN = "cousin",
  MOTHER = "mother",
  FATHER = "father",
  WIFE = "wife",
  HUSBAND = "husband",
  AUNT = "aunt",
  UNCLE = "uncle",
  GRANDMOTHER = "grandmother",
  GRANDFATHER = "grandfather",
  GREAT_GRANDFATHER = "great-grandfather",
  GREAT_GRANDMOTHER = "great-grandmother",
}

type Relation = {
  person: string;
  since: Date | "birth";
  to?: Date | null;
};

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
      country: string;
    };
  };
  biometricData: {
    weightKg: number;
    heightCm: number;
  };
  relations?: Partial<Record<RelationType, Relation>>;
}

export class PlayerCreationService {
  static async createPlayer(data: CreatePlayerInput) {
    const playerRepo = new PlayerRepository(prisma);
    const player = await playerRepo.create(data);

    return {
      id: player.playerId,
      fullName: `${player.fullName.firstName.preferred ?? player.fullName.firstName.legal} ${player.fullName.lastName}`,
    };
  }

  static async getPlayerById(playerId: string) {
    const playerRepo = new PlayerRepository(prisma);
    const player = await playerRepo.findById(playerId);
    
    return player;
  }

  static async getPlayerByName(name: string) {}
}
