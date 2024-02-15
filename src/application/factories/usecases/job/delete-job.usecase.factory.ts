import { IJobRepository } from "../../../../domain/repositories";
import { IDeleteJobUseCase } from "../../../../domain/usecases";
import { DeleteJobUseCaseImpl } from "../../../usecases";
import { jobRepositoryFactory } from "../../repositories";

export const deleteJobUseCaseFactory = (): IDeleteJobUseCase => {
  const jobRepository: IJobRepository = jobRepositoryFactory();

  return new DeleteJobUseCaseImpl(jobRepository);
};
