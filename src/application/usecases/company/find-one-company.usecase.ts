import { Company } from "../../../domain/entities";
import { NotFoundError } from "../../../domain/errors";
import { ICompanyRepository } from "../../../domain/repositories";
import { IFindOneCompanyUseCase } from "../../../domain/usecases";

export class FindOneCompanyUseCaseImpl implements IFindOneCompanyUseCase {
  constructor(private readonly _companyRepository: ICompanyRepository) {}

  async execute(id: string): Promise<Company> {
    const companyFound = await this._companyRepository.findOne(id);

    if (!companyFound) throw new NotFoundError("Company not found");

    return companyFound;
  }
}
