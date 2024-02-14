import { DomainError } from "../../domain/errors";
import { IHttpRequest, IHttpResponse } from "../protocols";

export const handleRequestError = (
  error: unknown,
  req: IHttpRequest
): IHttpResponse => {
    try {
        const message = error instanceof Error ? error.message : '';
        let statusCode = 500;

        if (error instanceof DomainError) {
            statusCode = 401;
        } 

        return { statusCode, body: message };
    } catch (error) {
        return { statusCode: 500, body: 'Server Error' };
    }
};

export const ok = (data?: unknown): IHttpResponse => ({
    statusCode: 200,
    body: data,
});