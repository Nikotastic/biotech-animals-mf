import apiClient from "../../../shared/utils/apiClient";

export const animalService = {
  // Get list of animals
  getAnimals: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      // Base URL per backend: /v1/animals
      const url = params ? `/v1/animals?${params}` : "/v1/animals";
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching animals:", error);
      throw error;
    }
  },

  // Get details of an animal
  getAnimalById: async (id) => {
    try {
      const response = await apiClient.get(`/v1/animals/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching animal ${id}:`, error);
      throw error;
    }
  },

  // Create new animal
  createAnimal: async (animalData) => {
    try {
      const response = await apiClient.post("/v1/animals", animalData);
      return response.data;
    } catch (error) {
      console.error("Error creating animal:", error);
      throw error;
    }
  },

  // Register animal movement
  registerMovement: async (id, movementData) => {
    try {
      const response = await apiClient.post(
        `/v1/animals/${id}/movements`,
        movementData
      );
      return response.data;
    } catch (error) {
      console.error(`Error registering movement for animal ${id}:`, error);
      throw error;
    }
  },

  // Update existing animal (Note: Not explicitly listed in API docs provided, keeping for safety)
  updateAnimal: async (id, animalData) => {
    try {
      const response = await apiClient.put(`/v1/animals/${id}`, animalData);
      return response.data;
    } catch (error) {
      console.error(`Error updating animal ${id}:`, error);
      throw error;
    }
  },

  // Delete animal (Note: Not explicitly listed in API docs provided, keeping for safety)
  deleteAnimal: async (id) => {
    try {
      const response = await apiClient.delete(`/v1/animals/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting animal ${id}:`, error);
      throw error;
    }
  },
};

export default animalService;
