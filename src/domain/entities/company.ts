import { DomainError } from "../errors";

const MIN_CHARACTERS_REQUIRED = 3;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class Company {
  _id: string;
  _name: string;
  _created_at: string;
  _updated_at: string;

  constructor(
    id: string,
    name: string,
    created_at: string,
    updated_at: string
  ) {
    this._id = id;
    this._name = name;
    this._created_at = created_at;
    this._updated_at = updated_at;

    this.validate();
  }

  validate() {
    if (!UUID_REGEX.test(this._id)) {
      throw new DomainError("The company id must be an uuid");
    }

    if (this._name.length < MIN_CHARACTERS_REQUIRED) {
      throw new DomainError("The company name must be at least 3 characters");
    }
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get created_at(): string {
    return this._created_at
  }

  get updated_at(): string {
    return this._updated_at
  }
}
