import { adaptRoute } from "../adapters";
import {
  archiveJobControllerFactory,
  createJobControllerFactory,
  deleteJobControllerFactory,
  publishJobControllerFactory,
  updateJobControllerFactory,
} from "../factories/controllers";
import { Express } from "express";

export = (app: Express) => {
  app.route("/jobs").post(adaptRoute(() => createJobControllerFactory()));

  app.route("/jobs/:id").put(adaptRoute(() => updateJobControllerFactory()));

  app.route("/jobs/:id").delete(adaptRoute(() => deleteJobControllerFactory()));

  app
    .route("/jobs/:id/publish")
    .put(adaptRoute(() => publishJobControllerFactory()));

  app
    .route("/jobs/:id/archive")
    .put(adaptRoute(() => archiveJobControllerFactory()));
};
