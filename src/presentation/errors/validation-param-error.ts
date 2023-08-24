export class ValidationParamError extends Error {
  constructor (paramName: string) {
    super(`ValidationParam: ${paramName}`)
    this.name = 'ValidationParamError'
  }
}
