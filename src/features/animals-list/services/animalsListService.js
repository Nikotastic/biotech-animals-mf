import { MOCK_ANIMALS } from "../../../shared/mocks/animalsData";

export const animalsListService = {
  getAnimals: async () => {
    // Simular retardo de red
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_ANIMALS);
      }, 800);
    });
  },
};
