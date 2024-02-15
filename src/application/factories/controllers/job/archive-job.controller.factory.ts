import { IArchiveJobUseCase } from "../../../../domain/usecases";
import { ArchiveJobController } from "../../../../presentation/controllers";
import { Controller } from "../../../../presentation/protocols";
import { archiveJobUseCaseFactory } from "../../usecases";

export const archiveJobControllerFactory = (): Controller => {
  const archiveJobUseCase: IArchiveJobUseCase = archiveJobUseCaseFactory();

  return new ArchiveJobController(archiveJobUseCase);
};
