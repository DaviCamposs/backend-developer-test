import { Job } from "../../../domain/entities";
import { JobStatus } from "../../../domain/entities/enums";
import { NotFoundError } from "../../../domain/errors";
import { IJobRepository } from "../../../domain/repositories";
import { IArchiveJobUseCase } from "../../../domain/usecases";
import { ArchiveJobUseCaseImpl } from "./archive-job.usecase";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";
const VALID_UUID_2 = "a2861d60-7790-4a3d-985b-48c314a843f8";

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
    expect(sut.execute(VALID_UUID)).rejects.toThrow(
      new NotFoundError(`Job with id: ${VALID_UUID} not found`)
    );
  });

  it("should archive a job when called", async () => {
    // Arrange
    const { sut, jobRepository } = makeSut();

    const jobToRemove = new Job(
      "job title",
      "job description",
      "some location",
      VALID_UUID_2,
      JobStatus.PUBLISHED,
      VALID_UUID,
      "created_at",
      "updated_at"
    );
    jest.spyOn(jobRepository, "findOne").mockResolvedValue(jobToRemove);

    // Act
    await sut.execute(VALID_UUID);

    // Behaviors
    expect(jobRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: VALID_UUID,
        _company_id: VALID_UUID_2,
        _description: "job description",
        _location: "some location",
        _status: "archived",
        _title: "job title",
        _created_at: "created_at",
        _updated_at: "updated_at",
      })
    );
  });
});
