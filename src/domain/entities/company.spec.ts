import { DomainError } from "../errors";
import { Company } from "./company";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Company unit tests", () => {
  it("should throw domain error when company id is invalid", () => {
    expect(
      () => new Company("123-123", "company", "created_at", "delete_at")
    ).toThrow(new DomainError("The company id must be an uuid"));
  });

  it("should throw domain error when company name is invalid", () => {
    expect(
      () => new Company(VALID_UUID, "c1", "created_at", "delete_at")
    ).toThrow(
      new DomainError("The company name must be at least 3 characters")
    );
  });

  it("should not throw any error when company is valid", () => {
    expect(
      () => new Company(VALID_UUID, "company 1", "created_at", "updated_at")
    ).not.toThrow();
  });

  it("should store correct values when is valid", () => {
    const result = new Company(
      VALID_UUID,
      "company 1",
      "created_at",
      "updated_at"
    );

    expect(result.id).toBe(VALID_UUID);
    expect(result.name).toBe("company 1");
    expect(result.created_at).toBe("created_at");
    expect(result.updated_at).toBe("updated_at");
  });
});
