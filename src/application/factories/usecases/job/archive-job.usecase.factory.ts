import { IJobRepository } from "../../../../domain/repositories";
import { IArchiveJobUseCase } from "../../../../domain/usecases";
import { ArchiveJobUseCaseImpl } from "../../../usecases";
import { jobRepositoryFactory } from "../../repositories";

export const archiveJobUseCaseFactory = (): IArchiveJobUseCase => {
  const jobRepository: IJobRepository = jobRepositoryFactory();

  return new ArchiveJobUseCaseImpl(jobRepository);
};
