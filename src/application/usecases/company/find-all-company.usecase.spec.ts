import { Company } from "../../../domain/entities"
import { ICompanyRepository } from "../../../domain/repositories"
import { IFindAllCompanyUseCase } from "../../../domain/usecases"
import { FindAllCompanyUseCaseImpl } from "./find-all-company.usecase"

interface SutTypes {
    companyRepository: ICompanyRepository
    sut: IFindAllCompanyUseCase
}

const makeSut = (): SutTypes => {
   const companyRepository: ICompanyRepository = {
    findAll: jest.fn(),
    findOne: jest.fn()
   }

    const sut: IFindAllCompanyUseCase = new FindAllCompanyUseCaseImpl(companyRepository)

    return {
        companyRepository,
        sut
    }
}

describe('FindAllCompanyUseCaseImpl unit tests', () => {
    it('should return all companies when called', async () => {
        // Arrange
        const { sut , companyRepository } = makeSut()
        const validResults: Company[] = [
            new Company('company 1'),
            new Company('company 2')
        ]
        const companyRepositorySpy = jest.spyOn(companyRepository,'findAll').mockResolvedValue(validResults)

        // Act
        const result = await sut.execute()

        // Assert
        expect(result).toStrictEqual(validResults)

        // Behaviors
        expect(companyRepositorySpy).toHaveBeenCalledTimes(1)
        expect(companyRepositorySpy).toHaveBeenCalledWith()

    })
})