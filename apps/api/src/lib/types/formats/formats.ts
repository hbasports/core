import { Format } from "./type.js";

export const TestFormat: Format = {
    name: "Test",
    inningsPerTeam: 2,
    dls: false,
    days: 5,
    maxOversPerInnings: null,
    dayNight: true, // Defines day/night as an option
    drsReviewsPerInnings: 3,
    newBall: true,
    newBallAfterOvers: 80,
    sessions: true,
    sessionsPerDay: 3,
    oversPerSession: 30,
    oversPerDay: 90,
    maxDeliveriesFacedByPlayer: null,
    gracePeriod: null,
    gracePeriodDeliveries: null,
    powerplays: null
}