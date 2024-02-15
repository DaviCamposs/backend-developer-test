import { ICompanyRepository } from "../../../../domain/repositories";
import { IFindOneCompanyUseCase } from "../../../../domain/usecases";
import { FindOneCompanyUseCaseImpl } from "../../../usecases";
import { companyRepositoryFactory } from "../../repositories";

export const findOneCompanyUseCaseFactory = (): IFindOneCompanyUseCase => {
  const companyRepository: ICompanyRepository = companyRepositoryFactory();

  return new FindOneCompanyUseCaseImpl(companyRepository);
};
