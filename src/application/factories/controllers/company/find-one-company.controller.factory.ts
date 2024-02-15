import { IFindOneCompanyUseCase } from "../../../../domain/usecases";
import { FindOneCompanyController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { findOneCompanyUseCaseFactory } from "../../usecases";

export const findOneCompanyControllerFactory = (): Controller => {
    
    const findOneCompanyUseCase: IFindOneCompanyUseCase = findOneCompanyUseCaseFactory()
    
    return new FindOneCompanyController(findOneCompanyUseCase)
}