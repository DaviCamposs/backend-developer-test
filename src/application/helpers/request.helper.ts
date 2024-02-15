import { IHttpRequest } from "../../presentation/protocols";
import { Request } from 'express';


export const RequestHelper = {
  parseExpressRequest(req: Request): IHttpRequest {
    const { method, params, body, query } = req as any;

    const httpRequest: IHttpRequest = {
      method,
      params,
      body,
      query,
    };

    return httpRequest;
  },
};
