import { NotFoundError } from "../../../domain/errors";
import { IJobRepository } from "../../../domain/repositories";
import { IArchiveJobUseCase } from "../../../domain/usecases";

export class ArchiveJobUseCaseImpl implements IArchiveJobUseCase {
    
    constructor(private readonly _jobRepository: IJobRepository) {}

    async execute(id: string): Promise<void> {
        const job = await this._jobRepository.findOne(id);

        if (!job) throw new NotFoundError(`Job with id: ${id} not found`);
    
        job.archive()

        await this._jobRepository.update(job);
    }
    
}