import { NotFoundError } from "../../../domain/errors";
import { IJobRepository } from "../../../domain/repositories";
import { IUpdateJobUseCase } from "../../../domain/usecases";

export class UpdateJobUseCaseImpl implements IUpdateJobUseCase {
  constructor(private readonly _jobRepository: IJobRepository) {}

  async execute(
    id: string,
    data: {
      title: string;
      description: string;
      location: string;
      status: string;
      company_id: string;
    }
  ): Promise<void> {
    const job = await this._jobRepository.findOne(id);

    if (!job) throw new NotFoundError(`Job with id:${id} not found`);

    job.update(
      data.title,
      data.description,
      data.location,
    );

    await this._jobRepository.update(job);
  }
}
