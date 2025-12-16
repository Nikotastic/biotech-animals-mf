import { animalService } from "../../../shared/services/animalService";

export const animalDetailService = {
  getAnimalById: async (id) => {
    try {
      const data = await animalService.getAnimalById(id);
      return data;
    } catch (error) {
      console.error(`Error fetching animal detail ${id}:`, error);
      throw error;
    }
  },
};
