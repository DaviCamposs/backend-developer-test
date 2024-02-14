import { IFindOneCompanyUseCase } from "../../../domain/usecases";
import { handleRequestError, ok } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class FindOneCompanyController implements Controller {
  constructor(
    private readonly _findOneCompanyUseCase: IFindOneCompanyUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const id = String(request.params.id);

      const result = await this._findOneCompanyUseCase.execute(id);

      return ok(result);
    } catch (error: unknown) {
      handleRequestError(error, request);
    }
  }
}
