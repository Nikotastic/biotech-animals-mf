import apiClient from '../../../shared/utils/apiClient'

export const animalsListService = {
  getAnimals: async (filters = {}) => {
    const response = await apiClient.get('/animals', { params: filters })
    return response.data
  },
  
  deleteAnimal: async (id) => {
    const response = await apiClient.delete(`/animals/${id}`)
    return response.data
  }
}