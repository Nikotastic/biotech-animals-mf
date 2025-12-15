import { useState, useEffect } from "react";
import { animalDetailService } from "../services/animalDetailService";

export function useAnimalDetail(id) {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(!!id); // Solo loading si hay ID
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setAnimal(null);
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await animalDetailService.getAnimalById(id);
        if (!data) {
          setError("Animal no encontrado");
        } else {
          setAnimal(data);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar el detalle del animal.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { animal, loading, error };
}
