import { Company } from "../../entities";

export interface IFindOneCompanyUseCase {
    execute(id: string): Promise<Company>
}