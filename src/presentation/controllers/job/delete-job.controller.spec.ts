import { IDeleteJobUseCase } from "../../../domain/usecases";
import { Controller } from "../../protocols";
import { DeleteJobController } from "./delete-job.controller";

interface SutTypes {
  deleteJobUseCase: IDeleteJobUseCase;
  sut: Controller;
}

const makeSut = (): SutTypes => {
  const deleteJobUseCase: IDeleteJobUseCase = {
    execute: jest.fn(),
  };

  const sut: Controller = new DeleteJobController(deleteJobUseCase);

  return {
    deleteJobUseCase,
    sut,
  };
};

describe("DeleteJobController unit test", () => {
  it("should return noContent when called", async () => {
    // Arrange
    const { sut, deleteJobUseCase } = makeSut();

    const deleteJobUseCaseSpy = jest.spyOn(deleteJobUseCase, "execute");

    // Act
    const result = await sut.handle({
      query: {},
      method: "DELETE",
      params: {
        id: "12345",
      },
      body: {}
    });

    // Assert
    expect(result.statusCode).toBe(204);

    // Behavior
    expect(deleteJobUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(deleteJobUseCaseSpy).toHaveBeenCalledWith("12345");
  });
});
