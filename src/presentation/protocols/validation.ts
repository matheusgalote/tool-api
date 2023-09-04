import type { HttpRequest } from './http'
export interface Validation {
  validate ({ body }: HttpRequest): Error | Promise<Error>
}
