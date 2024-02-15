import { v4 as uuid } from "uuid";
import { DomainError } from "../errors";
import { JobStatus } from "./enums";

const MIN_CHARACTERS_REQUIRED = 5;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class Job {
  _id: string;
  _title: string;
  _description: string;
  _location: string;
  _status: JobStatus;
  _company_id: string;
  _created_at: string;
  _updated_at: string;

  constructor(
    title: string,
    description: string,
    location: string,
    company_id: string,
    status: JobStatus | null = null,
    id: string | null = null,
    created_at: string | null = null,
    updated_at: string | null = null
  ) {
    this._title = title;
    this._description = description;
    this._location = location;
    this._company_id = company_id;

    // DEFAULT VALUES
    this._id = id || uuid();
    this._status = status || JobStatus.DRAFT;
    this._created_at = created_at || Date.now().toString();
    this._updated_at = updated_at || Date.now().toString();

    this.validate();
  }

  validate() {
    if (!UUID_REGEX.test(this._id)) {
      throw new DomainError("The job id must be an uuid");
    }

    if (this._title.length < MIN_CHARACTERS_REQUIRED) {
      throw new DomainError("The job title must be at least 5 characters");
    }

    if (this._description.length < MIN_CHARACTERS_REQUIRED) {
      throw new DomainError("The job description must be at least 5 characters");
    }

    if (this._location.length < MIN_CHARACTERS_REQUIRED) {
      throw new DomainError("The job location must be at least 5 characters");
    }

    if (!UUID_REGEX.test(this._company_id)) {
      throw new DomainError("The company_id must be an uuid");
    }
  }

  archive() {
    this._status = JobStatus.ARCHIVED;
  }

  isPossiblePublish() {
    return this._status === JobStatus.PUBLISHED ? false : true
  }

  update(title: string, description: string, location: string) {
    this._title = title;
    this._description = description;
    this._location = location;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get location(): string {
    return this._location;
  }

  get status(): string {
    return this._status;
  }
  get company_id(): string {
    return this._company_id;
  }

  get created_at(): string {
    return this._created_at
  }

  get updated_at(): string {
    return this._updated_at
  }
}
