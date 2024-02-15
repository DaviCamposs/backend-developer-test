import { IJobRepository } from "../../../../domain/repositories";
import { IPublishJobUseCase } from "../../../../domain/usecases";
import { PublishJobUseCaseImpl } from "../../../usecases";
import { jobRepositoryFactory } from "../../repositories";

export const publishJobUseCaseFactory = (): IPublishJobUseCase => {
  const jobRepository: IJobRepository = jobRepositoryFactory();

  return new PublishJobUseCaseImpl(jobRepository);
};
