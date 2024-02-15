import { adaptRoute } from "../adapters";
import { findAllCompanyControllerFactory, findOneCompanyControllerFactory } from "../factories/controllers";
import { Express } from "express";

export = (app: Express) => {
  app
    .route("/companies")
    .get(adaptRoute(() => findAllCompanyControllerFactory()));

    app
    .route("/companies/:id")
    .get(adaptRoute(() => findOneCompanyControllerFactory()));
};
