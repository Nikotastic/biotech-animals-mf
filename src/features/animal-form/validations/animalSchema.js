import * as yup from 'yup'

export const animalSchema = yup.object({
  name: yup.string().required('El nombre es requerido'),
  identifier: yup.string().required('El identificador es requerido'),
  type: yup.string().required('El tipo es requerido'),
  breed: yup.string().required('La raza es requerida'),
  age: yup.number().positive('Debe ser positivo').required('La edad es requerida'),
  weight: yup.number().positive('Debe ser positivo').required('El peso es requerido'),
  status: yup.string().required('El estado es requerido')
})