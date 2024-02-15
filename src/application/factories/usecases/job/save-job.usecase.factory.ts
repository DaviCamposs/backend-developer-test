import { IJobRepository } from "../../../../domain/repositories";
import { ISaveJobUseCase } from "../../../../domain/usecases";
import { SaveJobUseCaseImpl } from "../../../usecases";
import { jobRepositoryFactory } from "../../repositories";

export const saveJobUseCaseFactory = (): ISaveJobUseCase => {
  const jobRepository: IJobRepository = jobRepositoryFactory();

  return new SaveJobUseCaseImpl(jobRepository);
};
