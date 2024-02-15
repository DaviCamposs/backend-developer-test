import { Company } from "../../domain/entities";
import { ICompanyEntity } from "../entities";
import { Mapper } from "./mapper.interface";

export class CompanyMapper implements Mapper<ICompanyEntity, Company> {
  toDomain(data: ICompanyEntity): Company {
    return new Company(data.id, data.name, data.created_at, data.updated_at);
  }
}
