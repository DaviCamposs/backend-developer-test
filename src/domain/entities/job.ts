import { v4 as uuid } from "uuid";
import { DomainError } from "../errors";

const MIN_CHARACTERS_REQUIRED = 5

export class Job {
    _id: string
    _title: string
    _description: string
    _location: string
    _status: string
    _company_id: string
    _created_at: string
    _updated_at: string
    
    constructor(title: string, description: string, location: string, status: string, company_id: string) {
        this._id = uuid()
        this._title = title
        this._description = description
        this._location = location
        this._status = status
        this._company_id = company_id
        this._created_at = Date.now().toString()
        this._updated_at = Date.now().toString()

        this.validate()
    }

    validate() {
        if (this._title.length < MIN_CHARACTERS_REQUIRED) {
            throw new DomainError('The job title must be at least 5 characters')
        }
    }

    archive() {
        this._status = 'archived'
    }

    isPossiblePost() {
        return this._status === 'posted'
    }

    update(title: string, description: string, location: string, status: string, company_id: string) {
        this._title = title
        this._description = description
        this._location = location
        this._status = status
        this._company_id = company_id

        this.validate()
    }

}