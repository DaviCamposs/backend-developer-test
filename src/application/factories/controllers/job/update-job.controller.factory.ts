import { IUpdateJobUseCase } from "../../../../domain/usecases";
import { UpdateJobController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { updateJobUseCaseFactory } from "../../usecases";

export const updateJobControllerFactory = (): Controller => {
  const updateJobUseCase: IUpdateJobUseCase = updateJobUseCaseFactory();

  return new UpdateJobController(updateJobUseCase);
};
