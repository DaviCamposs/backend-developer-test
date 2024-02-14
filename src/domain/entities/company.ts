import { v4 as uuid } from "uuid";
import { DomainError } from "../errors"

const MIN_CHARACTERS_REQUIRED = 3

export class Company {
    _id: string
    _name: string
    _created_at: string
    _updated_at: string

    constructor(name: string) {
        this._id = uuid()
        this._name = name
        this._created_at = Date.now().toString()
        this._updated_at = Date.now().toString()

        this.validate()
    }
    

    validate() {
        if (this._name.length < MIN_CHARACTERS_REQUIRED) {
            throw new DomainError('The company name must be at least 3 characters')
        }
    }
}