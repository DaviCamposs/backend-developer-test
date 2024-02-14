import { Company } from "../../entities";

export interface IFindAllCompanyUseCase {
  execute(): Promise<Company[]>;
}
