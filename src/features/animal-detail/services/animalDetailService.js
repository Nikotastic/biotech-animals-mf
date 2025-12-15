import { MOCK_ANIMALS } from "../../../shared/mocks/animalsData";

export const animalDetailService = {
  getAnimalById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const animal = MOCK_ANIMALS.find((a) => a.id === id);
        if (animal) {
          resolve(animal);
        } else {
          // Si el ID no existe en mock, devolvemos null o error.
          // Para simular robustez, resolvemos null
          resolve(null);
        }
      }, 600);
    });
  },
};
