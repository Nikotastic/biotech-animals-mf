import { animalService } from "../../../shared/services/animalService";

export const animalsListService = {
  getAnimals: async () => {
    try {
      // Use the shared service which now points to /api/v1/animals
      const data = await animalService.getAnimals();
      return data;
    } catch (error) {
      console.error("Error fetching animals list:", error);
      throw error;
    }
  },
};
