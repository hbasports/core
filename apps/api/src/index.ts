import "./env.js"

import express from "express";
const app = express();

import { config } from "@/config/app.js";
import logger from "@/config/logger.js";

import routes from "@/modules/routes.js";
import errorHandler from "@/middleware/error.js";
import logRequest from "./middleware/request-ids/request-id.middleware.js";

import cors from "cors"

app.use(cors())

app.use(logRequest());
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

app.listen(config.api.port, () => {
  logger.info(
    `app started on port ${config.api.port} in ${config.env.type} environment`
  );
});
