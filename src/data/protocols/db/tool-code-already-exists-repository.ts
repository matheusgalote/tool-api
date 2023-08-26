export interface ToolCodeAlreadyExistsRepository {
  toolCodeAlreadyExists (code: string): Promise<boolean>
}
