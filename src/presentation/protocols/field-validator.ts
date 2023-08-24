import type { HttpRequest } from './http'

export interface FieldValidator {
  validate (body: HttpRequest): Promise<Error>
}
