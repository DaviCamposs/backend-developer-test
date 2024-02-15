import { Company } from "../../../domain/entities";
import { ICompanyRepository } from "../../../domain/repositories";
import { IFindAllCompanyUseCase } from "../../../domain/usecases";

export class FindAllCompanyUseCaseImpl implements IFindAllCompanyUseCase {
  constructor(private readonly _companyRepository: ICompanyRepository) {}

  async execute(): Promise<Company[]> {
    return await this._companyRepository.findAll();
  }
}
