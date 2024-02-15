import { ISaveJobUseCase } from "../../../../domain/usecases";
import { CreateJobController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { saveJobUseCaseFactory } from "../../usecases";

export const createJobControllerFactory = (): Controller => {
  const saveJobUseCase: ISaveJobUseCase = saveJobUseCaseFactory();

  return new CreateJobController(saveJobUseCase);
};
