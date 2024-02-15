import { IJobRepository } from "../../../domain/repositories";
import { JobRepositoryImpl } from "../../../infrastructure/repositories";

export const jobRepositoryFactory = (): IJobRepository => {
  return new JobRepositoryImpl();
};
