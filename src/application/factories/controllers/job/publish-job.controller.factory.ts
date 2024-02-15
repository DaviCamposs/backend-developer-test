import { IPublishJobUseCase } from "../../../../domain/usecases";
import { PublishJobController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { publishJobUseCaseFactory } from "../../usecases";

export const publishJobControllerFactory = (): Controller => {
  const publishJobUseCase: IPublishJobUseCase = publishJobUseCaseFactory();

  return new PublishJobController(publishJobUseCase);
};
