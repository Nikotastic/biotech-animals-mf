import { animalService } from "../../../shared/services/animalService";

export const animalFormService = {
  createAnimal: async (data) => {
    try {
      const result = await animalService.createAnimal(data);
      return result;
    } catch (error) {
      console.error("Error creating animal:", error);
      throw error;
    }
  },

  updateAnimal: async (id, data) => {
    try {
      const result = await animalService.updateAnimal(id, data);
      return result;
    } catch (error) {
      console.error(`Error updating animal ${id}:`, error);
      throw error;
    }
  },
};
