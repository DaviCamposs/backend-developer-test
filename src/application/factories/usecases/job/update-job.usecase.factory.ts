import { IJobRepository } from "../../../../domain/repositories";
import { IUpdateJobUseCase } from "../../../../domain/usecases";
import { UpdateJobUseCaseImpl } from "../../../usecases";
import { jobRepositoryFactory } from "../../repositories";

export const updateJobUseCaseFactory = (): IUpdateJobUseCase => {
  const jobRepository: IJobRepository = jobRepositoryFactory();

  return new UpdateJobUseCaseImpl(jobRepository);
};
