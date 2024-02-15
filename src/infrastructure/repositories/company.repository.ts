import { Repository } from "typeorm";
import { Company } from "../../domain/entities";
import { ICompanyRepository } from "../../domain/repositories";
import connectionDB from "../config/typeorm";
import { ICompanyEntity, CompanyEntity } from "../entities";
import { CompanyMapper } from "../mappers";

export class CompanyRepositoryImpl implements ICompanyRepository {
  _repository: Repository<ICompanyEntity>;

  constructor() {
    this._repository = connectionDB.getRepository(CompanyEntity);
  }

  async findAll(): Promise<Company[]> {
    const results = await this._repository.find();

    return results.map((item) => new CompanyMapper().toDomain(item));
  }

  async findOne(id: string): Promise<Company | null> {
    const result = await this._repository.findOne({
      where: {
        id,
      },
    });

    return result ? new CompanyMapper().toDomain(result) : null;
  }
}
