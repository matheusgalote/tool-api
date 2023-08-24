import { string } from 'yup'

export const addToolValidation = {
  name: string().max(255).required(),
  code: string().max(255).required(),
  description: string().max(2000)
}
