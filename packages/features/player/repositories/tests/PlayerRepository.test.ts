import { describe, test, vi, expect, beforeEach, it } from "vitest";
import { PlayerRepository } from "../PlayerRepository";
import { prisma } from "@hbasports/prisma/client";

describe("UserRepository", () => {
    test("should create a player", async () => {
        const user = await new PlayerRepository(prisma).create({
            fullName: {
                firstName: {
                    legal: "Patrick",
                    preferred: "Pat"
                },
                middleNames: ["James"],
                lastName: "Cummins"
            },
            biometricData: {
                weightKg: 89,
                heightCm: 192
            },
            birthDetails: {
                date: "1993-08-05T00:00.00Z",
                gender: "MALE",
                location: {
                    city: "Westmead",
                    state: "NSW",
                    country: "Australia"
                }
            }
        })

        expect(user).toBeDefined()
    })
})