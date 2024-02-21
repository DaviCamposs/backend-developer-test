import { Company } from "../../../domain/entities"
import { ICompanyRepository } from "../../../domain/repositories"
import { IFindAllCompanyUseCase } from "../../../domain/usecases"
import { FindAllCompanyUseCaseImpl } from "./find-all-company.usecase"

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";
const VALID_UUID_2 = "a2861d60-7790-4a3d-985b-48c314a843f8";

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
            new Company(VALID_UUID,'company 1', 'created_at','updated_at'),
            new Company(VALID_UUID_2,'company 2', 'created_at','updated_at'),
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