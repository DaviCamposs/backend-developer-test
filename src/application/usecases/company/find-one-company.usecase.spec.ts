import { Company } from "../../../domain/entities";
import { NotFoundError } from "../../../domain/errors";
import { ICompanyRepository } from "../../../domain/repositories";
import { IFindOneCompanyUseCase } from "../../../domain/usecases";
import { FindOneCompanyUseCaseImpl } from "./find-one-company.usecase";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";


interface SutTypes {
  companyRepository: ICompanyRepository;
  sut: IFindOneCompanyUseCase;
}

const makeSut = (): SutTypes => {
  const companyRepository: ICompanyRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const sut: IFindOneCompanyUseCase = new FindOneCompanyUseCaseImpl(
    companyRepository
  );

  return {
    companyRepository,
    sut,
  };
};

describe("FindOneCompanyUseCaseImpl unit tests", () => {
  it("should throw a notFoundError when there is no company", async () => {
    // Arrange
    const { sut, companyRepository } = makeSut();
    const companyRepositorySpy = jest
      .spyOn(companyRepository, "findOne")
      .mockResolvedValue(null);

    // Act and Assert
    expect(() => sut.execute(VALID_UUID)).rejects.toThrow(
      new NotFoundError("Company not found")
    );

    // Behaviors
    expect(companyRepositorySpy).toHaveBeenCalledTimes(1);
    expect(companyRepositorySpy).toHaveBeenCalledWith(VALID_UUID);
  });

  it("should return a company when there is company", async () => {
    // Arrange
    const { sut, companyRepository } = makeSut();
    const expectedCompany = new Company(VALID_UUID,'company 1', 'created_at','updated_at')
    const companyRepositorySpy = jest
      .spyOn(companyRepository, "findOne")
      .mockResolvedValue(expectedCompany);

    // Act
    const result = await sut.execute(VALID_UUID)
    
    // Assert
    expect(result).toStrictEqual(expectedCompany)

    // Behaviors
    expect(companyRepositorySpy).toHaveBeenCalledTimes(1);
    expect(companyRepositorySpy).toHaveBeenCalledWith(VALID_UUID);
  });
});
