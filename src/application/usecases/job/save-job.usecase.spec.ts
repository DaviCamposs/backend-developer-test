import { IJobRepository } from "../../../domain/repositories";
import { ISaveJobUseCase } from "../../../domain/usecases";
import { SaveJobUseCaseImpl } from "./save-job.usecase";

interface SutTypes {
  jobRepository: IJobRepository;
  sut: ISaveJobUseCase;
}

const makeSut = (): SutTypes => {
  const jobRepository: IJobRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const sut: ISaveJobUseCase = new SaveJobUseCaseImpl(jobRepository);

  return {
    jobRepository,
    sut,
  };
};

describe("SaveJobUseCaseImpl unit tests", () => {
  it("should save job when called", async () => {
    // Arrange
    const { sut, jobRepository } = makeSut();
    const jobRepositorySpy = jest.spyOn(jobRepository, "save");

    // act
    await sut.execute({
      title: "title",
      description: "description",
      location: "location",
      company_id: "id",
      status: "status",
    });

    // Assert
    expect(jobRepositorySpy).toHaveBeenCalledTimes(1);
    expect(jobRepositorySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        _company_id: "id",
        _description: "description",
        _location: "location",
        _status: "status",
        _title: "title",
      })
    );
  });
});
