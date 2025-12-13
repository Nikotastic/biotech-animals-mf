import apiClient from '../../../shared/utils/apiClient'

export const animalFormService = {
  createAnimal: async (data) => {
    const response = await apiClient.post('/animals', data)
    return response.data
  },
  
  updateAnimal: async (id, data) => {
    const response = await apiClient.put(`/animals/${id}`, data)
    return response.data
  }
}