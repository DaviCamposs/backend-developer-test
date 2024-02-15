import { IFindAllCompanyUseCase } from "../../../domain/usecases";
import { handleRequestError, ok } from "../../helpers";
import { Controller, IHttpRequest, IHttpResponse } from "../../protocols";

export class FindAllCompanyController implements Controller {
  constructor(
    private readonly _findAllCompanyUseCase: IFindAllCompanyUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const results = await this._findAllCompanyUseCase.execute();

      return ok(results);
    } catch (error: unknown) {
      return handleRequestError(error, request);
    }
  }
}
