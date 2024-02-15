import { IUpdateJobUseCase } from "../../../domain/usecases";
import { handleRequestError, noContent } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class UpdateJobController implements Controller {
  constructor(private readonly _updateJobUseCase: IUpdateJobUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const id = request.params.id;
      const { title, description, location, status, company_id } = request.body;

      await this._updateJobUseCase.execute(id, {
        title,
        description,
        location,
        status,
        company_id,
      });

      return noContent();
    } catch (error: unknown) {
      return handleRequestError(error, request);
    }
  }
}
