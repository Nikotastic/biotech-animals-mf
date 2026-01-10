import apiClient from "../utils/apiClient";

// Mock data
const MOCK_ANIMALS = [
  {
    id: "1",
    earTag: "COL-001",
    name: "Bella",
    breed: "Holstein",
    category: "Vaca",
    gender: "Hembra",
    birthDate: "2020-05-15",
    weight: 550,
    status: "Activo",
    paddock: "Potrero A",
    batch: "Lote 1",
    farmId: "demo-farm-id",
  },
  {
    id: "2",
    earTag: "COL-002",
    name: "Max",
    breed: "Angus",
    category: "Toro",
    gender: "Macho",
    birthDate: "2019-03-20",
    weight: 720,
    status: "Activo",
    paddock: "Potrero B",
    batch: "Lote 2",
    farmId: "demo-farm-id",
  },
  {
    id: "3",
    earTag: "COL-003",
    name: "Luna",
    breed: "Jersey",
    category: "Novilla",
    gender: "Hembra",
    birthDate: "2021-08-10",
    weight: 380,
    status: "Activo",
    paddock: "Potrero A",
    batch: "Lote 1",
    farmId: "demo-farm-id",
  },
  {
    id: "4",
    earTag: "COL-004",
    name: "Rocky",
    breed: "Brahman",
    category: "Novillo",
    gender: "Macho",
    birthDate: "2022-01-05",
    weight: 420,
    status: "Activo",
    paddock: "Potrero C",
    batch: "Lote 3",
    farmId: "demo-farm-id",
  },
];

const MOCK_BREEDS = [
  "Holstein",
  "Angus",
  "Jersey",
  "Brahman",
  "Simmental",
  "Charolais",
];
const MOCK_CATEGORIES = [
  "Vaca",
  "Toro",
  "Novilla",
  "Novillo",
  "Ternero",
  "Ternera",
];
const MOCK_PADDOCKS = [
  { id: "1", name: "Potrero A", capacity: 50 },
  { id: "2", name: "Potrero B", capacity: 30 },
  { id: "3", name: "Potrero C", capacity: 40 },
];
const MOCK_BATCHES = [
  { id: "1", name: "Lote 1", count: 25 },
  { id: "2", name: "Lote 2", count: 15 },
  { id: "3", name: "Lote 3", count: 20 },
];

export const animalService = {
  // Get list of animals
  getAnimals: async (filters = {}) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      let filteredAnimals = [...MOCK_ANIMALS];

      if (filters.farmId) {
        // En modo desarrollo/mock: Si filtramos por granja, devolvemos los animales mock
        // asignados a esa granja para que siempre se vean datos.
        filteredAnimals = filteredAnimals.map((a) => ({
          ...a,
          farmId: filters.farmId,
        }));
      }

      if (filters.status) {
        filteredAnimals = filteredAnimals.filter(
          (a) => a.status === filters.status
        );
      }

      return filteredAnimals;
    } catch (error) {
      console.error("Error fetching animals:", error);
      throw error;
    }
  },

  // Get details of an animal
  getAnimalById: async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const animal = MOCK_ANIMALS.find((a) => a.id === id);
      if (!animal) throw new Error("Animal not found");
      return animal;
    } catch (error) {
      console.error(`Error fetching animal ${id}:`, error);
      throw error;
    }
  },

  // Create new animal
  createAnimal: async (animalData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newAnimal = {
        id: String(MOCK_ANIMALS.length + 1),
        ...animalData,
        status: "Activo",
      };
      MOCK_ANIMALS.push(newAnimal);
      return newAnimal;
    } catch (error) {
      console.error("Error creating animal:", error);
      throw error;
    }
  },

  // Update existing animal
  updateAnimal: async (id, animalData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const index = MOCK_ANIMALS.findIndex((a) => a.id === id);
      if (index === -1) throw new Error("Animal not found");
      MOCK_ANIMALS[index] = { ...MOCK_ANIMALS[index], ...animalData };
      return MOCK_ANIMALS[index];
    } catch (error) {
      console.error(`Error updating animal ${id}:`, error);
      throw error;
    }
  },

  // Delete animal
  deleteAnimal: async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const index = MOCK_ANIMALS.findIndex((a) => a.id === id);
      if (index === -1) throw new Error("Animal not found");
      MOCK_ANIMALS.splice(index, 1);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting animal ${id}:`, error);
      throw error;
    }
  },

  // Register animal movement (e.g., pasture change)
  registerMovement: async (id, movementData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { success: true, message: "Movement registered" };
    } catch (error) {
      console.error(`Error registering movement for animal ${id}:`, error);
      throw error;
    }
  },

  // Update animal weight
  updateWeight: async (id, weightData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const animal = MOCK_ANIMALS.find((a) => a.id === id);
      if (animal) animal.weight = weightData.weight;
      return { success: true };
    } catch (error) {
      console.error(`Error updating weight for animal ${id}:`, error);
      throw error;
    }
  },

  // Move animal to a different batch
  moveToBatch: async (id, batchData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const animal = MOCK_ANIMALS.find((a) => a.id === id);
      if (animal) animal.batch = batchData.batchName;
      return { success: true };
    } catch (error) {
      console.error(`Error moving animal ${id} to batch:`, error);
      throw error;
    }
  },

  // Mark animal as sold
  markAsSold: async (id, saleData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const animal = MOCK_ANIMALS.find((a) => a.id === id);
      if (animal) animal.status = "Vendido";
      return { success: true };
    } catch (error) {
      console.error(`Error marking animal ${id} as sold:`, error);
      throw error;
    }
  },

  // Mark animal as dead
  markAsDead: async (id, deathData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const animal = MOCK_ANIMALS.find((a) => a.id === id);
      if (animal) animal.status = "Muerto";
      return { success: true };
    } catch (error) {
      console.error(`Error marking animal ${id} as dead:`, error);
      throw error;
    }
  },

  // Get breeds
  getBreeds: async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_BREEDS;
    } catch (error) {
      console.error("Error fetching breeds:", error);
      return [];
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_CATEGORIES;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // Get paddocks
  getPaddocks: async (filters = {}) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_PADDOCKS;
    } catch (error) {
      console.error("Error fetching paddocks:", error);
      return [];
    }
  },

  // Get batches
  getBatches: async (filters = {}) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_BATCHES;
    } catch (error) {
      console.error("Error fetching batches:", error);
      return [];
    }
  },

  // Get movement types
  getMovementTypes: async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return ["Compra", "Venta", "Traslado", "Nacimiento", "Muerte"];
    } catch (error) {
      console.error("Error fetching movement types:", error);
      return [];
    }
  },
};

export default animalService;
