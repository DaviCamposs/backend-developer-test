import { IArchiveJobUseCase } from "../../../domain/usecases";
import { handleRequestError, noContent } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class ArchiveJobController implements Controller {
  constructor(private readonly _archiveJobUseCase: IArchiveJobUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const id = request.params.id;

      await this._archiveJobUseCase.execute(id);

      return noContent();
    } catch (error: unknown) {
      return handleRequestError(error, request);
    }
  }
}
