import { useState, useEffect, useCallback } from "react";
import { animalService } from "@shared/services/animalService";
import { useAuthStore } from "@shared/store/authStore";
import { useToastStore } from "@shared/store/toastStore";

export function useAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const selectedFarm = useAuthStore((state) => state.selectedFarm);
  const addToast = useToastStore((state) => state.addToast);

  const fetchAnimals = useCallback(async () => {
    try {
      setLoading(true);

      // Check if farm is selected
      if (!selectedFarm?.id) {
        setError("Por favor selecciona una granja primero.");
        setLoading(false);
        return;
      }

      const data = await animalService.getAnimals({
        farmId: selectedFarm.id,
      });
      setAnimals(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching animals:", err);

      // Better error handling with demo data fallback
      if (err.response?.status === 405 || err.response?.status === 500) {
        // Endpoint not implemented or server error - use demo data
        console.warn(
          `Animals endpoint error (${err.response?.status}). Using demo data.`
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
          `⚠️ Modo Demo: Error ${err.response?.status} en el servidor. Mostrando datos de prueba.`,
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
  }, [selectedFarm?.id, addToast]);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  // Update animal weight
  const updateWeight = async (animalId, weightData) => {
    try {
      setActionLoading(true);
      await animalService.updateWeight(animalId, weightData);
      addToast("✅ Peso actualizado correctamente", "success");
      await fetchAnimals(); // Refresh list
      return true;
    } catch (err) {
      console.error("Error updating weight:", err);
      addToast("❌ Error al actualizar el peso", "error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Move animal to batch
  const moveToBatch = async (animalId, batchData) => {
    try {
      setActionLoading(true);
      await animalService.moveToBatch(animalId, batchData);
      addToast("✅ Animal movido al lote correctamente", "success");
      await fetchAnimals(); // Refresh list
      return true;
    } catch (err) {
      console.error("Error moving to batch:", err);
      addToast("❌ Error al mover el animal al lote", "error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Mark animal as sold
  const markAsSold = async (animalId, saleData) => {
    try {
      setActionLoading(true);
      await animalService.markAsSold(animalId, saleData);
      addToast("✅ Animal marcado como vendido", "success");
      await fetchAnimals(); // Refresh list
      return true;
    } catch (err) {
      console.error("Error marking as sold:", err);
      addToast("❌ Error al marcar como vendido", "error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Mark animal as dead
  const markAsDead = async (animalId, deathData) => {
    try {
      setActionLoading(true);
      await animalService.markAsDead(animalId, deathData);
      addToast("✅ Animal marcado como fallecido", "success");
      await fetchAnimals(); // Refresh list
      return true;
    } catch (err) {
      console.error("Error marking as dead:", err);
      addToast("❌ Error al marcar como fallecido", "error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Register movement
  const registerMovement = async (animalId, movementData) => {
    try {
      setActionLoading(true);
      await animalService.registerMovement(animalId, movementData);
      addToast("✅ Movimiento registrado correctamente", "success");
      await fetchAnimals(); // Refresh list
      return true;
    } catch (err) {
      console.error("Error registering movement:", err);
      addToast("❌ Error al registrar el movimiento", "error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // Delete animal
  const deleteAnimal = async (animalId) => {
    try {
      setActionLoading(true);
      await animalService.deleteAnimal(animalId);
      addToast("✅ Animal eliminado correctamente", "success");
      await fetchAnimals(); // Refresh list
      return true;
    } catch (err) {
      console.error("Error deleting animal:", err);
      addToast("❌ Error al eliminar el animal", "error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    animals,
    loading,
    error,
    actionLoading,
    refetch: fetchAnimals,
    updateWeight,
    moveToBatch,
    markAsSold,
    markAsDead,
    registerMovement,
    deleteAnimal,
  };
}
