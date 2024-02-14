import { Job } from "../entities";

export interface IJobRepository {
  findOne(id: string): Promise<Job | null>;
  save(job: Job): Promise<void>;
  update(job: Job): Promise<void>;
  delete(job: Job): Promise<void>;
}
