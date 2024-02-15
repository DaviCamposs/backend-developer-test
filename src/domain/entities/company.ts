import { v4 as uuid } from "uuid";
import { DomainError } from "../errors";

const MIN_CHARACTERS_REQUIRED = 3;

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
    if (this._name.length < MIN_CHARACTERS_REQUIRED) {
      throw new DomainError("The company name must be at least 3 characters");
    }
  }
}
