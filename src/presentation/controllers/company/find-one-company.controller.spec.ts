import { Company } from "../../../domain/entities";
import {
  IFindAllCompanyUseCase,
  IFindOneCompanyUseCase,
} from "../../../domain/usecases";
import { Controller } from "../../protocols";
import { FindAllCompanyController } from "./find-all-company.controller";
import { FindOneCompanyController } from "./find-one-company.controller";

interface SutTypes {
  findOneCompanyUseCase: IFindOneCompanyUseCase;
  sut: Controller;
}

const makeSut = (): SutTypes => {
  const findOneCompanyUseCase: IFindOneCompanyUseCase = {
    execute: jest.fn(),
  };

  const sut: Controller = new FindOneCompanyController(findOneCompanyUseCase);

  return {
    findOneCompanyUseCase,
    sut,
  };
};

describe("FindOneCompanyController unit tests", () => {
  it("should return result when called", async () => {
    // Arrange
    const { sut, findOneCompanyUseCase } = makeSut();
    const validResult = new Company("company 1");

    const findOneCompanyUseCaseSpy = jest
      .spyOn(findOneCompanyUseCase, "execute")
      .mockResolvedValue(validResult);

    // Act
    const result = await sut.handle({
      query: {},
      method: "GET",
      params: {
        id: "123",
      },
      body: {},
    });

    // Assert
    expect(result.statusCode).toBe(200);
    expect(result.body).toStrictEqual(validResult);

    // Behaviors
    expect(findOneCompanyUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(findOneCompanyUseCaseSpy).toHaveBeenCalledWith("123");
  });
});
