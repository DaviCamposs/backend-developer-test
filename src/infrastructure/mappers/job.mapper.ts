import { Job } from "../../domain/entities";
import { IJobEntity } from "../entities";
import { Mapper } from "./mapper.interface";

export class JobMapper implements Mapper<IJobEntity, Job> {
  toDomain(data: IJobEntity): Job {
    return new Job(
      data.title,
      data.description,
      data.location,
      data.company_id,
      data.status,
      data.id,
      data.created_at,
      data.updated_at
    );
  }
}
