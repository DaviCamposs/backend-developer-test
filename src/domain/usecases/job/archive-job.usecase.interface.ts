export interface IArchiveJobUseCase {
  execute(id: string): Promise<void>;
}
