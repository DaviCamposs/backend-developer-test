import { ICompanyRepository } from "../../../../domain/repositories";
import { IFindAllCompanyUseCase } from "../../../../domain/usecases";
import { FindAllCompanyUseCaseImpl } from "../../../usecases";
import { companyRepositoryFactory } from "../../repositories";

export const findAllCompanyUseCaseFactory = (): IFindAllCompanyUseCase => {
    
    const companyRepository: ICompanyRepository = companyRepositoryFactory()
    
    return new FindAllCompanyUseCaseImpl(companyRepository)
}