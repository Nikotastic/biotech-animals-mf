import apiService from "@shared-services/ApiService";

export const animalService = {
  // Get list of animals
  getAnimals: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      // Base URL per backend: /v1/animals
      const url = params ? `/v1/animals?${params}` : "/v1/animals";
      const response = await apiService.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching animals:", error);
      throw error;
    }
  },

  // Get details of an animal
  getAnimalById: async (id) => {
    try {
      const response = await apiService.get(`/v1/animals/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching animal ${id}:`, error);
      throw error;
    }
  },

  // Create new animal
  createAnimal: async (animalData) => {
    try {
      const response = await apiService.post("/v1/animals", animalData);
      return response.data;
    } catch (error) {
      console.error("Error creating animal:", error);
      throw error;
    }
  },

  // Update existing animal
  updateAnimal: async (id, animalData) => {
    try {
      const response = await apiService.put(`/v1/animals/${id}`, animalData);
      return response.data;
    } catch (error) {
      console.error(`Error updating animal ${id}:`, error);
      throw error;
    }
  },

  // Delete animal
  deleteAnimal: async (id) => {
    try {
      const response = await apiService.delete(`/v1/animals/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting animal ${id}:`, error);
      throw error;
    }
  },

  // Register animal movement (e.g., pasture change)
  registerMovement: async (id, movementData) => {
    try {
      const response = await apiService.post(
        `/v1/animals/${id}/movements`,
        movementData
      );
      return response.data;
    } catch (error) {
      console.error(`Error registering movement for animal ${id}:`, error);
      throw error;
    }
  },

  // Update animal weight
  updateWeight: async (id, weightData) => {
    try {
      const response = await apiService.put(
        `/v1/animals/${id}/weight`,
        weightData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating weight for animal ${id}:`, error);
      throw error;
    }
  },

  // Move animal to a different batch
  moveToBatch: async (id, batchData) => {
    try {
      const response = await apiService.put(
        `/v1/animals/${id}/batch`,
        batchData
      );
      return response.data;
    } catch (error) {
      console.error(`Error moving animal ${id} to batch:`, error);
      throw error;
    }
  },

  // Mark animal as sold
  markAsSold: async (id, saleData) => {
    try {
      const response = await apiService.put(`/v1/animals/${id}/sell`, saleData);
      return response.data;
    } catch (error) {
      console.error(`Error marking animal ${id} as sold:`, error);
      throw error;
    }
  },

  // Mark animal as dead
  markAsDead: async (id, deathData) => {
    try {
      const response = await apiService.put(
        `/v1/animals/${id}/dead`,
        deathData
      );
      return response.data;
    } catch (error) {
      console.error(`Error marking animal ${id} as dead:`, error);
      throw error;
    }
  },
  // Get breeds
  getBreeds: async () => {
    try {
      const response = await apiService.get("/v1/breeds");
      return response.data;
    } catch (error) {
      console.error("Error fetching breeds:", error);
      return [];
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await apiService.get("/v1/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // Get paddocks
  getPaddocks: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const url = params ? `/v1/paddocks?${params}` : "/v1/paddocks";
      const response = await apiService.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching paddocks:", error);
      return [];
    }
  },

  // Get batches
  getBatches: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const url = params ? `/v1/batches?${params}` : "/v1/batches";
      const response = await apiService.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching batches:", error);
      return [];
    }
  },
  // Get movement types
  getMovementTypes: async () => {
    try {
      const response = await apiService.get("/v1/movement-types");
      return response.data;
    } catch (error) {
      console.error("Error fetching movement types:", error);
      return [];
    }
  },
};

export default animalService;
