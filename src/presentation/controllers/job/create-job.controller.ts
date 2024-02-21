import { ISaveJobUseCase } from "../../../domain/usecases";
import { created, handleRequestError } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class CreateJobController implements Controller {
  constructor(private readonly _saveJobUseCase: ISaveJobUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { title, description, location, status, company_id } = request.body;

      await this._saveJobUseCase.execute(
        title,
        description,
        location,
        company_id,
      );

      return created({
        message: "Job created",
      });
    } catch (error: unknown) {
      return handleRequestError(error, request);
    }
  }
}
