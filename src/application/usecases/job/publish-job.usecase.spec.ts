import { Job } from "../../../domain/entities";
import { InvalidOperationError, NotFoundError } from "../../../domain/errors";
import { IJobRepository } from "../../../domain/repositories";
import { IPublishJobUseCase } from "../../../domain/usecases";
import { PublishJobUseCaseImpl } from "./publish-job.usecase";

interface SutTypes {
  jobRepository: IJobRepository;
  sut: IPublishJobUseCase;
}

const makeSut = (): SutTypes => {
  const jobRepository: IJobRepository = {
    delete: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const sut: IPublishJobUseCase = new PublishJobUseCaseImpl(jobRepository);

  return {
    jobRepository,
    sut,
  };
};

describe("PublishJobUseCaseImpl unit tests", () => {
  it("should throw a NotFoundError when there is no job with id searched", async () => {
    // Arrange
    const { sut, jobRepository } = makeSut();

    jest.spyOn(jobRepository, "findOne").mockResolvedValue(null);

    // Assert
    expect(sut.execute("123")).rejects.toThrow(
      new NotFoundError("Job with id:123 not found")
    );
  });

  it("should throw an InvalidOperationError when post is already post", async () => {
    // Arrange
    const { sut, jobRepository } = makeSut();

    const postAlreadyPost = new Job(
      "title",
      "description",
      "location",
      "post",
      "1234"
    );

    jest.spyOn(jobRepository, "findOne").mockResolvedValue(postAlreadyPost);

    // Assert
    expect(sut.execute("123")).rejects.toThrow(
      new InvalidOperationError("It is not possible re-post a job")
    );
  });
});
