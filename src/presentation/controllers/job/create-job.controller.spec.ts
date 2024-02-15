import {
  ISaveJobUseCase,
} from "../../../domain/usecases";
import { Controller } from "../../protocols";
import { CreateJobController } from "./create-job.controller";

interface SutTypes {
  saveJobUseCase: ISaveJobUseCase;
  sut: Controller;
}

const makeSut = (): SutTypes => {
  const saveJobUseCase: ISaveJobUseCase = {
    execute: jest.fn(),
  };

  const sut: Controller = new CreateJobController(saveJobUseCase);

  return {
    saveJobUseCase,
    sut,
  };
};

describe("CreateJobController unit tests", () => {
  it("should return message when called", async () => {
    // Arrange
    const { sut, saveJobUseCase } = makeSut();

    const saveJobUseCaseSpy = jest.spyOn(saveJobUseCase, "execute");

    // Act
    const result = await sut.handle({
      query: {},
      method: "POST",
      params: {},
      body: {
        title: "title",
        description: "description",
        location: "location",
        status: "archived",
        company_id: "123",
      },
    });

    // Assert
    expect(result.statusCode).toBe(201);
    expect(result.body).toStrictEqual({
      message: "Job created",
    });

    // Behavior
    expect(saveJobUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(saveJobUseCaseSpy).toHaveBeenCalledWith({
      title: "title",
      description: "description",
      location: "location",
      status: "archived",
      company_id: "123",
    });
  });
});
