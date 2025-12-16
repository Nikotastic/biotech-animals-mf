import { useState, useEffect } from "react";
import { animalsListService } from "../services/animalsListService";
import { useAuthStore } from "@shared/store/authStore";
import { useToastStore } from "@shared/store/toastStore";

export function useAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedFarm = useAuthStore((state) => state.selectedFarm);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);

        // Check if farm is selected
        if (!selectedFarm?.id) {
          setError("Por favor selecciona una granja primero.");
          setLoading(false);
          return;
        }

        const data = await animalsListService.getAnimals({
          farmId: selectedFarm.id,
        });
        setAnimals(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching animals:", err);

        // Better error handling with demo data fallback
        if (err.response?.status === 405) {
          // Endpoint not implemented - use demo data
          console.warn(
            "Animals endpoint not available (405). Using demo data."
          );
          setAnimals([
            {
              id: "demo-1",
              name: "Vaca Demo 1",
              breed: "Holstein",
              age: 3,
              weight: 550,
              status: "Saludable",
              farmId: selectedFarm.id,
            },
            {
              id: "demo-2",
              name: "Vaca Demo 2",
              breed: "Jersey",
              age: 2,
              weight: 450,
              status: "Saludable",
              farmId: selectedFarm.id,
            },
          ]);
          addToast(
            "⚠️ Modo Demo: Endpoint 405. Mostrando datos de prueba.",
            "warning"
          );
          setError(null);
        } else if (err.response?.status === 404) {
          setAnimals([]);
          setError("No se encontraron animales en esta granja.");
        } else {
          setError("Error al cargar la lista de animales.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [selectedFarm?.id]);

  return { animals, loading, error };
}
