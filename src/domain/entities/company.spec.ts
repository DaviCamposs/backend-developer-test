import { DomainError } from "../errors"
import { Company } from "./company"

describe('Company unit tests', () => {
    it('should throw domain error when company is invalid', () => {
        expect(() => new Company('av')).toThrow(new DomainError('The company name must be at least 3 characters'))
    })

    it('should not throw any error when company is valid', () => {
        expect(() => new Company('name')).not.toThrow()
    })
})