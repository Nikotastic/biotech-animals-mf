export const animalFormService = {
  createAnimal: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("API Create Animal:", data);
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
