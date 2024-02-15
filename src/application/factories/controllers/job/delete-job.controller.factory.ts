import { IDeleteJobUseCase } from "../../../../domain/usecases";
import { DeleteJobController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { deleteJobUseCaseFactory } from "../../usecases";

export const deleteJobControllerFactory = (): Controller => {
  const deleteJobUseCase: IDeleteJobUseCase = deleteJobUseCaseFactory();

  return new DeleteJobController(deleteJobUseCase);
};
