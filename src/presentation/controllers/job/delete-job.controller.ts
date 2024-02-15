import { IDeleteJobUseCase } from "../../../domain/usecases";
import { handleRequestError, noContent } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class DeleteJobController implements Controller {
  constructor(private readonly _deleteJobUseCase: IDeleteJobUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const id = request.params.id;

      await this._deleteJobUseCase.execute(id);

      return noContent();
    } catch (error: unknown) {
      handleRequestError(error, request);
    }
  }
}
