import { NotFoundError } from "../../../domain/errors";
import { IJobRepository } from "../../../domain/repositories";
import { IDeleteJobUseCase } from "../../../domain/usecases";

export class DeleteJobUseCaseImpl implements IDeleteJobUseCase {
  constructor(private readonly _jobRepository: IJobRepository) {}

  async execute(id: string): Promise<void> {
    const job = await this._jobRepository.findOne(id);

    if (!job) throw new NotFoundError(`Job with id:${id} not found`);

    await this._jobRepository.delete(job);
  }
}
