import { Job } from "../../../domain/entities";
import { NotFoundError } from "../../../domain/errors";
import { IJobRepository } from "../../../domain/repositories";
import { IArchiveJobUseCase } from "../../../domain/usecases";
import { ArchiveJobUseCaseImpl } from "./archive-job.usecase";

interface SutTypes {
  jobRepository: IJobRepository;
  sut: IArchiveJobUseCase;
}

const makeSut = (): SutTypes => {
  const jobRepository: IJobRepository = {
    delete: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const sut: IArchiveJobUseCase = new ArchiveJobUseCaseImpl(jobRepository);

  return {
    jobRepository,
    sut,
  };
};

describe("ArchiveJobUseCaseImpl unit tests", () => {
  it("should throw a NotFoundError when there is no job with id searched", async () => {
    // Arrange
    const { sut, jobRepository } = makeSut();

    jest.spyOn(jobRepository, "findOne").mockResolvedValue(null);

    // Assert
    expect(sut.execute("123")).rejects.toThrow(
      new NotFoundError("Job with id:123 not found")
    );
  });

  it("should archive a job when called", async () => {
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
    expect(jobRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        _company_id: "567",
        _description: "description",
        _location: "location",
        _status: "archived",
        _title: "title",
      })
    );
  });
});
