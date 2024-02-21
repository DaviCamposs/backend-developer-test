import { Job } from "../../../domain/entities";
import { JobStatus } from "../../../domain/entities/enums";
import { IJobRepository } from "../../../domain/repositories";
import { ISaveJobUseCase } from "../../../domain/usecases";

export class SaveJobUseCaseImpl implements ISaveJobUseCase {
  constructor(private readonly _jobRepository: IJobRepository) {}

  async execute(
    title: string,
    description: string,
    location: string,
    company_id: string
  ): Promise<void> {
    const job = new Job(
      '1',
      title,
      description,
      location,
      JobStatus.ARCHIVED,
      company_id,
      '',''
    );

    await this._jobRepository.save(job);
  }
}
