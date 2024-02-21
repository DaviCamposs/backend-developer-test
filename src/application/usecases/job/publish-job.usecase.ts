import { InvalidOperationError, NotFoundError } from "../../../domain/errors";
import { IJobRepository } from "../../../domain/repositories";
import { IPublishJobUseCase } from "../../../domain/usecases";

export class PublishJobUseCaseImpl implements IPublishJobUseCase {
  constructor(private readonly _jobRepository: IJobRepository) {}

  async execute(id: string): Promise<void> {
    const job = await this._jobRepository.findOne(id);

    if (!job) throw new NotFoundError(`Job with id:${id} not found`);

    if (!job.isPossiblePublish())
        throw new InvalidOperationError('It is not possible re-post a job')
  }
}
