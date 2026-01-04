import "./env.js";

import express from "express";
import cors from "cors";

import { config } from "@/config/app";
import logger from "@/config/logger";
import routes from "@/modules/routes";
import errorHandler from "@/middleware/error";
import logRequest from "./middleware/request-ids/request-id.middleware";

const app = express();

app.use(cors());

app.use(logRequest());
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

app.listen(config.api.port, () => {
  logger.info(
    `app started on port ${config.api.port} in ${config.env.type} environment`
  );
});
