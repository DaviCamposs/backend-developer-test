export interface ISaveJobUseCase {
  execute(
    title: string,
    description: string,
    location: string,
    company_id: string
  ): Promise<void>;
}
