import { useState, useEffect } from "react";
import { animalsListService } from "../services/animalsListService";

export function useAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        const data = await animalsListService.getAnimals();
        setAnimals(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error al cargar la lista de animales.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return { animals, loading, error };
}
