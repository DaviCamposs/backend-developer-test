import { DomainError } from "../errors";
import { Job } from "./job";

describe("Job unit tests", () => {
  it("should throw domain error when job is invalid", () => {
    expect(() => new Job("av", "", "location", "", "")).toThrow(
      new DomainError("The job title must be at least 5 characters")
    );
  });

  it("should not throw any error when job is valid", () => {
    expect(
      () => new Job("title", "description", "location", "status", "1")
    ).not.toThrow();
  });
});
