import { Request, Response } from "express";
import {
  Controller,
  IHttpRequest,
  IHttpResponse,
} from "../../presentation/protocols";
import { RequestHelper } from "../helpers";

export const adaptRoute = (controllerFactory: () => Controller) => {
  return async (req: Request, res: Response) => {
    const controller: Controller = controllerFactory();

    const httpRequest: IHttpRequest = RequestHelper.parseExpressRequest(req);
    const httpResponse: IHttpResponse = await controller.handle(httpRequest);

    res.status(httpResponse.statusCode);
    res.json(httpResponse.body);
  };
};
