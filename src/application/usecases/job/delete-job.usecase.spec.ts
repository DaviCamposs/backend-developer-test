import { Job } from "../../../domain/entities";
import { NotFoundError } from "../../../domain/errors";
import { IJobRepository } from "../../../domain/repositories";
import { IDeleteJobUseCase } from "../../../domain/usecases";
import { DeleteJobUseCaseImpl } from "./delete-job.usecase";

interface SutTypes {
  jobRepository: IJobRepository;
  sut: IDeleteJobUseCase;
}

const makeSut = (): SutTypes => {
  const jobRepository: IJobRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const sut: IDeleteJobUseCase = new DeleteJobUseCaseImpl(jobRepository);

  return {
    jobRepository,
    sut,
  };
};

describe("DeleteJobUseCaseImpl unit tests", () => {
  it("should throw a NotFoundError when there is no job with id searched", async () => {
    // Arrange
    const { sut, jobRepository } = makeSut();

    jest.spyOn(jobRepository, "findOne").mockResolvedValue(null);

    // Assert
    expect(sut.execute("123")).rejects.toThrow(
      new NotFoundError("Job with id:123 not found")
    );
  });

  it("should delete a job when called", async () => {
    // Arrange
    const { sut, jobRepository } = makeSut();

    const jobToRemove = new Job(
      "title",
      "description",
      "location",
      "status",
      "567"
    );
    jest.spyOn(jobRepository, "findOne").mockResolvedValue(jobToRemove);

    // Act
    await sut.execute("123");

    // Behaviors
    expect(jobRepository.delete).toHaveBeenCalledWith(
      expect.objectContaining({
        _company_id: "567",
        _description: "description",
        _location: "location",
        _status: "status",
        _title: "title",
      })
    );
  });
});
