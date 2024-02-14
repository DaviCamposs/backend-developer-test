export interface IPublishJobUseCase {
    execute(id: string): Promise<void>
}