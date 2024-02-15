import { ICompanyRepository } from "../../../domain/repositories";
import { CompanyRepositoryImpl } from "../../../infrastructure/repositories";

export const companyRepositoryFactory = (): ICompanyRepository => {
  return new CompanyRepositoryImpl();
};
