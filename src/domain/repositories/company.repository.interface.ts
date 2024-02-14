import { Company } from "../entities";

export interface ICompanyRepository {
    findAll(): Promise<Company[]>
    findOne(id: string): Promise<Company | null>
}