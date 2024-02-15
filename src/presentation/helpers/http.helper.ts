import { DomainError, NotFoundError } from "../../domain/errors";
import { IHttpRequest, IHttpResponse } from "../protocols";

export const handleRequestError = (
  error: unknown,
  req: IHttpRequest
): IHttpResponse => {
  try {
    const message = error instanceof Error ? error.message : "";
    let statusCode = 500;

    if (error instanceof DomainError) {
      statusCode = 401;
    }

    if (error instanceof NotFoundError) {
      statusCode = 404;
    }
    return { statusCode, body: message };
  } catch (error) {
    return { statusCode: 500, body: "Server Error" };
  }
};

export const ok = (data?: unknown): IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (
  data: Record<string, unknown> | Record<string, unknown>[]
): IHttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: null,
});
