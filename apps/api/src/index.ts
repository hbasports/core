import express from "express";
const app = express();

import playerRoutes from "./modules/cricketers/cricketer.route.js";

import { config } from "./config/app.js";
import logger from "./config/logger.js";

import V1Routes from "./modules/routes.js";

app.use(express.json());
app.use("/api", V1Routes);

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(config.api.port, () => {
  logger.info(`app started on port ${config.api.port} in ${config.env.type} environment`);
});
