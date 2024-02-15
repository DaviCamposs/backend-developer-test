import { IPublishJobUseCase } from "../../../domain/usecases";
import { handleRequestError, noContent } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class PublishJobController implements Controller {
  constructor(private readonly _publishJobUseCase: IPublishJobUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const id = request.params.id;

      await this._publishJobUseCase.execute(id);

      return noContent();
    } catch (error: unknown) {
      return handleRequestError(error, request);
    }
  }
}
