import { MOCK_ANIMALS } from "../../../shared/mocks/animalsData";

export const animalDetailService = {
  getAnimalById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const animal = MOCK_ANIMALS.find((a) => a.id === id);
        if (animal) {
          resolve(animal);
        } else {
       // If the ID does not exist in mock, we return null or error. 
        // To simulate robustness, we resolve null
          resolve(null);
        }
      }, 600);
    });
  },
};
