import { create } from 'zustand'

export const useAnimalsStore = create((set) => ({
  animals: [],
  selectedAnimal: null,
  filters: {},
  loading: false,
  
  setAnimals: (animals) => set({ animals }),
  setSelectedAnimal: (animal) => set({ selectedAnimal: animal }),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading })
}))