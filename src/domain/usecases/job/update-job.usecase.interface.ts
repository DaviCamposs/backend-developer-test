export interface IUpdateJobUseCase {
  execute(
    id: string,
    data: {
      title: string;
      description: string;
      location: string;
      status: string;
      company_id: string;
    }
  ): Promise<void>;
}
