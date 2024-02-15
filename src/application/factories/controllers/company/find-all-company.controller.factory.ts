import { IFindAllCompanyUseCase } from "../../../../domain/usecases";
import { FindAllCompanyController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { findAllCompanyUseCaseFactory } from "../../usecases";

export const findAllCompanyControllerFactory = (): Controller => {
    
    const findAllCompanyUseCase: IFindAllCompanyUseCase = findAllCompanyUseCaseFactory()
    
    return new FindAllCompanyController(findAllCompanyUseCase)
}