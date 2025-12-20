import express from "express";
const app = express();

import { config } from "@/config/app.js";
import logger from "@/config/logger.js";

import V1Routes from "@/modules/routes.js";
import errorHandler from "@/middleware/error.js";

app.use(express.json());
app.use("/api", V1Routes);

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.use(errorHandler)

app.listen(config.api.port, () => {
  logger.info(`app started on port ${config.api.port} in ${config.env.type} environment`);
});
