type Powerplay = {
    fieldersOutsideCircle: number,
    lengthDeliveries: number,
    name: "Powerplay" | string
}

export type Format = {
    name: string
    inningsPerTeam: number
    dls?: boolean,
    days?: number,
    maxOversPerInnings: number | null;
    dayNight?: boolean,
    drsReviewsPerInnings?: number,
    newBall?: boolean,
    newBallAfterOvers: number,
    sessions?: boolean,
    sessionsPerDay: number,
    oversPerSession: number,
    oversPerDay: number,
    maxDeliveriesFacedByPlayer?: number | null,
    gracePeriod?: boolean | null,
    gracePeriodDeliveries?: number | null
    powerplays?: Powerplay[] | null
}