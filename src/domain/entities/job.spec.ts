import { v4 as uuid } from "uuid";
import { Job } from "./job";
import { JobStatus } from "./enums";
import { DomainError } from "../errors";

jest.mock("uuid");

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";
const VALID_UUID_2 = "a2861d60-7790-4a3d-985b-48c314a843f8";

describe("Job unit tests", () => {
  it("should create a job with default values when not fill all arguments", () => {
    // Arrange
    (uuid as jest.Mock).mockReturnValue(VALID_UUID);
    jest
      .spyOn(Date, "now")
      .mockReturnValueOnce(1600000000000)
      .mockReturnValueOnce(1700000000000);

    // Act
    const result = new Job(
      "job title",
      "job description",
      "some location",
      VALID_UUID_2
    );

    expect(result.title).toBe("job title");
    expect(result.description).toBe("job description");
    expect(result.location).toBe("some location");
    expect(result.company_id).toBe(VALID_UUID_2);

    // Default values section
    expect(result.id).toBe(VALID_UUID);
    expect(result.status).toBe(JobStatus.DRAFT);
    expect(result.created_at).toBe("1600000000000");
    expect(result.updated_at).toBe("1700000000000");
  });

  it("should create a job with passed values when fill all arguments", () => {
    // Act
    const result = new Job(
      "job title",
      "job description",
      "some location",
      VALID_UUID_2,
      JobStatus.PUBLISHED,
      VALID_UUID,
      "created_at",
      "updated_at"
    );

    // Assert
    expect(result.id).toBe(VALID_UUID);
    expect(result.title).toBe("job title");
    expect(result.description).toBe("job description");
    expect(result.location).toBe("some location");
    expect(result.company_id).toBe(VALID_UUID_2);
    expect(result.status).toBe(JobStatus.PUBLISHED);
    expect(result.created_at).toBe("created_at");
    expect(result.updated_at).toBe("updated_at");
  });

  it("should throw a DomainError when job id is invalid ", () => {
    expect(
      () =>
        new Job(
          "job title",
          "job description",
          "some location",
          VALID_UUID_2,
          JobStatus.PUBLISHED,
          "123",
          "created_at",
          "updated_at"
        )
    ).toThrow(new DomainError("The job id must be an uuid"));
  });

  it("should throw a DomainError when job title is invalid ", () => {
    expect(
      () =>
        new Job(
          "t",
          "job description",
          "some location",
          VALID_UUID_2,
          JobStatus.PUBLISHED,
          VALID_UUID,
          "created_at",
          "updated_at"
        )
    ).toThrow(new DomainError("The job title must be at least 5 characters"));
  });

  it("should throw a DomainError when job description is invalid ", () => {
    expect(
      () =>
        new Job(
          "job title",
          "d",
          "some location",
          VALID_UUID_2,
          JobStatus.PUBLISHED,
          VALID_UUID,
          "created_at",
          "updated_at"
        )
    ).toThrow(new DomainError("The job description must be at least 5 characters"));
  });

  it("should throw a DomainError when job location is invalid ", () => {
    expect(
      () =>
        new Job(
          "job title",
          "job description",
          "l",
          VALID_UUID_2,
          JobStatus.PUBLISHED,
          VALID_UUID,
          "created_at",
          "updated_at"
        )
    ).toThrow(new DomainError("The job location must be at least 5 characters"));
  });

  it("should throw a DomainError when company_id is invalid ", () => {
    expect(
      () =>
        new Job(
          "job title",
          "job description",
          "some location",
          '123',
          JobStatus.PUBLISHED,
          VALID_UUID,
          "created_at",
          "updated_at"
        )
    ).toThrow(new DomainError("The company_id must be an uuid"));
  });

  it("should update job status when call method archive", () => {
    // Arrange
    const job = new Job(
      "job title",
      "job description",
      "some location",
      VALID_UUID_2,
      JobStatus.PUBLISHED,
      VALID_UUID,
      "created_at",
      "updated_at"
    );

    // Act
    job.archive()

    // Assert
    expect(job.status).toBe(JobStatus.ARCHIVED);
  });


  it("should return false to publish when job is already published", () => {
    // Arrange
    const job = new Job(
      "job title",
      "job description",
      "some location",
      VALID_UUID_2,
      JobStatus.PUBLISHED,
      VALID_UUID,
      "created_at",
      "updated_at"
    );

    // Act
    const result = job.isPossiblePublish()

    // Assert
    expect(result).toBeFalsy()
  });


  it("should update values when call method to update", () => {
    // Arrange
    const job = new Job(
      "job title",
      "job description",
      "some location",
      VALID_UUID_2,
      JobStatus.PUBLISHED,
      VALID_UUID,
      "created_at",
      "updated_at"
    );

    // Act
    job.update('new job title','new job description','new job location')

    // Assert
    expect(job.title).toBe('new job title')
    expect(job.description).toBe('new job description')
    expect(job.location).toBe('new job location')

  });

});
