import { Company } from "../../../domain/entities";
import { IFindAllCompanyUseCase } from "../../../domain/usecases";
import { Controller } from "../../protocols";
import { FindAllCompanyController } from "./find-all-company.controller";

interface SutTypes {
    findAllCompanyUseCase: IFindAllCompanyUseCase,
    sut: Controller
}

const makeSut = (): SutTypes => {
    const findAllCompanyUseCase: IFindAllCompanyUseCase = {
        execute: jest.fn()
    }

    const sut: Controller = new FindAllCompanyController(findAllCompanyUseCase)

    return {
        findAllCompanyUseCase,sut
    }
}

describe('FindAllCompanyController unit tests', () => {
    it('should return result when called', async () => {
        // Arrange
        const { sut , findAllCompanyUseCase} = makeSut()
        const validResult: Company[] = [
            new Company('company 1'),
            new Company('company 2')
        ]

        jest.spyOn(findAllCompanyUseCase,'execute').mockResolvedValue(validResult)

        // Act
        const result = await sut.handle({
            query: {},
            method: 'GET',
            params: {},
            body: {}
        })

        // Assert
        expect(result.statusCode).toBe(200)
        expect(result.body).toStrictEqual(validResult)
    })
})