export const animalFormService = {
  createAnimal: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("API Create Animal:", data);
        // En una app real, el backend asignaría ID. Aquí simulamos.
        // Nota: Esto no persistirá en MOCK_ANIMALS entre recargas porque es JS en browser.
        resolve({ ...data, id: Date.now().toString() });
      }, 1000);
    });
  },

  updateAnimal: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("API Update Animal:", id, data);
        resolve({ ...data, id });
      }, 1000);
    });
  },
};
