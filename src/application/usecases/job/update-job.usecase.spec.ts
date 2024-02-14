import { Job } from "../../../domain/entities";
import { NotFoundError } from "../../../domain/errors";
import { IJobRepository } from "../../../domain/repositories";
import { IUpdateJobUseCase } from "../../../domain/usecases";
import { UpdateJobUseCaseImpl } from "./update-job.usecase";

interface SutTypes {
    jobRepository: IJobRepository;
    sut: IUpdateJobUseCase;
  }
  
  const makeSut = (): SutTypes => {
    const jobRepository: IJobRepository = {
      delete: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };
  
    const sut: IUpdateJobUseCase = new UpdateJobUseCaseImpl(jobRepository);
  
    return {
      jobRepository,
      sut,
    };
  };

describe('UpdateJobImpl unit tests', () => {
    it("should throw a NotFoundError when there is no job with id searched", async () => {
        // Arrange
        const { sut, jobRepository } = makeSut();
    
        jest.spyOn(jobRepository, "findOne").mockResolvedValue(null);
    
        // Assert
        expect(sut.execute("123", {
            title: 'new title',
            description: 'new description',
            location: 'new location',
            status: 'drafting',
            company_id: '123'
        })).rejects.toThrow(
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
        await sut.execute("123",{
            title: 'new title',
            description: 'new description',
            location: 'new location',
            status: 'drafting',
            company_id: '567'}
        );
    
        // Behaviors
        expect(jobRepository.update).toHaveBeenCalledWith(
          expect.objectContaining({
            _company_id: "567",
            _description: "new description",
            _location: "new location",
            _status: "drafting",
            _title: "new title",
          })
        );
      });
})