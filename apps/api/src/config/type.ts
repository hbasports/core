export type AppConfig = {
    env: {
        type: "production" | "development"
    },
    api: {
        port: number,
        url: string
    }
}