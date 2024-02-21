export interface IUpdateJobUseCase {
  execute(
    id: string,
    data: {
      title: string;
      description: string;
      location: string;
    }
  ): Promise<void>;
}
