import { Repository } from "typeorm";
import { Job } from "../../domain/entities";
import { IJobRepository } from "../../domain/repositories";
import connectionDB from "../config/typeorm";
import { IJobEntity, JobEntity } from "../entities";
import { JobMapper } from "../mappers";

export class JobRepositoryImpl implements IJobRepository {
  _repository: Repository<IJobEntity>;

  constructor() {
    this._repository = connectionDB.getRepository(JobEntity);
  }

  async findOne(id: string): Promise<Job | null> {
    const result = await this._repository.findOne({
      where: {
        id,
      },
    });

    return result ? new JobMapper().toDomain(result) : null;
  }

  async save(job: Job): Promise<void> {
    await this._repository.save({
      title: job.title,
      description: job.description,
      location: job.location,
      company_id: job.company_id,
    });
  }

  async update(job: Job): Promise<void> {
    await this._repository.update(
      {
        id: job.id,
      },
      {
        title: job.title,
        description: job.description,
        location: job.location,
      }
    );
  }

  async delete(job: Job): Promise<void> {
    await this._repository.delete({
      id: job.id,
    });
  }
}
