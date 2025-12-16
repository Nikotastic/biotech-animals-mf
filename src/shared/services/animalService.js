import apiClient from '../../../shared/utils/apiClient'

export const animalService = {
 // Get list of animals
  getAnimals: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      const url = params ? `/animals?${params}` : '/animals'
      const response = await apiClient.get(url)
      return response.data
    } catch (error) {
      console.error('Error fetching animals:', error)
      throw error
    }
  },

 // Get details of an animal
  getAnimalById: async (id) => {
    try {
      const response = await apiClient.get(`/animals/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching animal ${id}:`, error)
      throw error
    }
  },

 // Create new animal
  createAnimal: async (animalData) => {
    try {
      const response = await apiClient.post('/animals', animalData)
      return response.data
    } catch (error) {
      console.error('Error creating animal:', error)
      throw error
    }
  },

// Update existing animal
  updateAnimal: async (id, animalData) => {
    try {
      const response = await apiClient.put(`/animals/${id}`, animalData)
      return response.data
    } catch (error) {
      console.error(`Error updating animal ${id}:`, error)
      throw error
    }
  },

 // Delete animal
  deleteAnimal: async (id) => {
    try {
      const response = await apiClient.delete(`/animals/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting animal ${id}:`, error)
      throw error
    }
  }
}

export default animalService
