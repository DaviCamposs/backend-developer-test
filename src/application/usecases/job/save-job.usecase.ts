import { Job } from "../../../domain/entities";
import { IJobRepository } from "../../../domain/repositories";
import { ISaveJobUseCase } from "../../../domain/usecases";

export class SaveJobUseCaseImpl implements ISaveJobUseCase {
  constructor(private readonly _jobRepository: IJobRepository) {}

  async execute(data: {
    title: string;
    description: string;
    location: string;
    status: string;
    company_id: string;
  }): Promise<void> {
    const job = new Job(
      '1',
      data.title,
      data.description,
      data.location,
      data.status,
      data.company_id,
      '',''
    );

    await this._jobRepository.save(job);
  }
}
