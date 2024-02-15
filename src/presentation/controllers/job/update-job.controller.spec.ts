import { IUpdateJobUseCase } from "../../../domain/usecases";
import { Controller } from "../../protocols";
import { UpdateJobController } from "./update-job.controller";

interface SutTypes {
  updateJobUseCase: IUpdateJobUseCase;
  sut: Controller;
}

const makeSut = (): SutTypes => {
  const updateJobUseCase: IUpdateJobUseCase = {
    execute: jest.fn(),
  };

  const sut: Controller = new UpdateJobController(updateJobUseCase);

  return {
    updateJobUseCase,
    sut,
  };
};

describe("UpdateJobController unit test", () => {
  it("should return noContent when called", async () => {
    // Arrange
    const { sut, updateJobUseCase } = makeSut();

    const updateJobUseCaseSpy = jest.spyOn(updateJobUseCase, "execute");

    // Act
    const result = await sut.handle({
      query: {},
      method: "PUT",
      params: {
        id: "12345",
      },
      body: {
        title: "title",
        description: "description",
        location: "location",
        status: "archived",
        company_id: "123",
      },
    });

    // Assert
    expect(result.statusCode).toBe(204);

    // Behavior
    expect(updateJobUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(updateJobUseCaseSpy).toHaveBeenCalledWith("12345", {
      title: "title",
      description: "description",
      location: "location",
      status: "archived",
      company_id: "123",
    });
  });
});
