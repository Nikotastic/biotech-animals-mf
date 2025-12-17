import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { animalService } from "../../../shared/services/animalService";
import { AnimalFormView } from "./AnimalFormView";
import { useAnimalDetail } from "../../animal-detail/hooks/useAnimalDetail";
import { useAnimalMutation } from "../hooks/useAnimalMutation";
import alertService from "../../../shared/utils/alertService";
import { useAuthStore } from "../../../shared/store/authStore";

export default function AnimalForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedFarm = useAuthStore((state) => state.selectedFarm);

  // Read hook (shared/imported from detail)
  const {
    animal,
    loading: loadingData,
    error: loadError,
  } = useAnimalDetail(id || null);

  // Writing hook (specific to this feature)
  const { createAnimal, updateAnimal, isSaving, saveError } =
    useAnimalMutation();

  const [resources, setResources] = useState({
    breeds: [],
    categories: [],
    paddocks: [],
    batches: [],
    movementTypes: [],
  });

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const [
          breedsRes,
          categoriesRes,
          paddocksRes,
          batchesRes,
          movementTypesRes,
        ] = await Promise.all([
          animalService.getBreeds(),
          animalService.getCategories(),
          animalService.getPaddocks(
            selectedFarm?.id ? { farmId: selectedFarm.id } : {}
          ),
          animalService.getBatches(
            selectedFarm?.id ? { farmId: selectedFarm.id } : {}
          ),
          animalService.getMovementTypes(),
        ]);

        const getList = (res) => (Array.isArray(res) ? res : res?.data || []);

        setResources({
          breeds: getList(breedsRes),
          categories: getList(categoriesRes),
          paddocks: getList(paddocksRes),
          batches: getList(batchesRes),
          movementTypes: getList(movementTypesRes),
        });
      } catch (err) {
        console.error("Error loading resources:", err);
      }
    };
    fetchResources();
  }, [selectedFarm?.id]);

  const handleSave = async (formData) => {
    try {
      // Map frontend data to Backend DTO
      const animalDto = {
        id: id ? parseInt(id) : undefined,
        visualCode: formData.identifier,
        birthDate: formData.birthDate || null,
        name: formData.name,
        initialCost: formData.initialCost
          ? parseFloat(formData.initialCost)
          : 0,
        // Ensure ID is number. Fallback to searching in resources if ID is missing but name exists
        breedId: formData.breedId
          ? parseInt(formData.breedId)
          : resources.breeds.find((b) => b.name === formData.breed)?.id ||
            undefined,
        categoryId: formData.categoryId
          ? parseInt(formData.categoryId)
          : resources.categories.find((c) => c.name === formData.type)?.id ||
            undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        paddockId: formData.paddockId
          ? parseInt(formData.paddockId)
          : resources.paddocks.find((p) => p.name === formData.location)?.id ||
            undefined,
        sex: formData.gender === "Macho" ? "M" : "F",
        farmId: selectedFarm?.id || undefined,
      };

      console.log("Saving Animal DTO:", animalDto);

      if (id) {
        // Update might use a different DTO, but usually similar structure
        await updateAnimal(id, animalDto);

        // Handle Weight Update if provided
        if (formData.weight) {
          const weightPayload = {
            id: id ? parseInt(id) : undefined, // Some endpoints expect ID in payload too
            weight: parseFloat(formData.weight),
            date: new Date().toISOString().split("T")[0],
            userId: user?.id || 1,
          };
          try {
            await animalService.updateWeight(id, weightPayload);
          } catch (wErr) {
            console.warn("Weight update failed", wErr);
            alertService.warning(
              "Animal guardado, pero falló actualizar el peso",
              "Atención"
            );
          }
        }

        // Handle Location Update (Movement)
        if (formData.paddockId && formData.paddockId != animal?.paddockId) {
          const moveType =
            resources.movementTypes?.find(
              (mt) =>
                mt.name?.toLowerCase().includes("traslado") ||
                mt.name?.toLowerCase().includes("cambio")
            ) || resources.movementTypes?.[0];

          if (moveType) {
            const movementPayload = {
              movementTypeId: moveType.id,
              toPaddockId: parseInt(formData.paddockId),
              movementDate: new Date().toISOString().split("T")[0],
              observations: "Cambio de ubicación desde edición",
              userId: user?.id || 1,
            };
            try {
              await animalService.registerMovement(id, movementPayload);
            } catch (mErr) {
              console.warn("Movement registration failed", mErr);
              alertService.warning(
                "Ubicación no actualizada (falló registro de movimiento)",
                "Atención"
              );
            }
          }
        }

        alertService.success(
          `Animal "${formData.name || "sin nombre"}" actualizado correctamente`,
          "Éxito"
        );
      } else {
        // Create flow
        if (!animalDto.farmId) {
          alertService.warning(
            "Selecciona una granja antes de crear",
            "Selección Requerida"
          );
          return;
        }
        const newAnimal = await createAnimal(animalDto);
        const createdAnimalId = newAnimal?.data?.id || newAnimal?.id;

        // If weight provided on creation, try to update it using the new ID
        if (createdAnimalId && formData.weight) {
          const weightPayload = {
            weight: parseFloat(formData.weight),
            date: new Date().toISOString().split("T")[0],
            userId: user?.id || 1,
          };
          try {
            await animalService.updateWeight(createdAnimalId, weightPayload);
          } catch (e) {
            console.warn("Initial weight update failed", e);
          }
        }

        // If paddock provided on creation, try to register initial movement
        if (createdAnimalId && formData.paddockId) {
          const moveType =
            resources.movementTypes?.find(
              (mt) =>
                mt.name?.toLowerCase().includes("entrada") ||
                mt.name?.toLowerCase().includes("inicio") ||
                mt.name?.toLowerCase().includes("traslado")
            ) || resources.movementTypes?.[0];

          if (moveType) {
            const movementPayload = {
              movementTypeId: moveType.id,
              toPaddockId: parseInt(formData.paddockId),
              movementDate: new Date().toISOString().split("T")[0],
              observations: "Ubicación inicial tras registro",
              userId: user?.id || 1,
            };
            try {
              await animalService.registerMovement(
                createdAnimalId,
                movementPayload
              );
            } catch (e) {
              console.warn("Initial movement registration failed", e);
            }
          }
        }

        alertService.success(
          `Animal "${formData.name || "sin nombre"}" creado correctamente`,
          "Éxito"
        );
      }

      // Redirect after success
      setTimeout(() => navigate("/animals"), 500);
    } catch (error) {
      console.error("Error saving:", error);
      const errorMessage = error.response?.data?.message || error.message;

      if (error.response?.status === 400) {
        alertService.warning(
          "Datos inválidos. Verifica que todos los campos sean correctos",
          "Datos Inválidos"
        );
      } else if (error.response?.status === 409) {
        alertService.error(
          "Ya existe un animal con ese identificador",
          "Error de Conflicto"
        );
      } else if (error.response?.status === 500) {
        alertService.error(
          "Error del servidor. Intenta nuevamente más tarde",
          "Error de Servidor"
        );
      } else if (!error.response) {
        alertService.error(
          "No se pudo conectar con el servidor",
          "Error de Conexión"
        );
      } else {
        alertService.error(`Error al guardar: ${errorMessage}`, "Error");
      }
    }
  };

  const handleCancel = () => {
    navigate("/animals");
  };

  const handleDelete = async () => {
    const result = await alertService.deleteConfirm(
      "",
      "¿Estás seguro de eliminar este animal? Esta acción no se puede deshacer."
    );
    if (!result.isConfirmed) return;

    try {
      await animalService.deleteAnimal(id);
      alertService.success("Animal eliminado correctamente", "Eliminado");
      navigate("/animals");
    } catch (err) {
      console.error("Error deleting animal:", err);
      alertService.error("Error al eliminar el animal", "Error");
    }
  };

  // Loading state for initial data loading (only in edition)
  if (id && loadingData) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // State error for initial load
  if (id && loadError) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-xl border border-red-200 m-4">
        <h3 className="text-red-700 font-bold mb-2">Error al cargar animal</h3>
        <p className="text-red-600 mb-4">{loadError}</p>
        <button onClick={handleCancel} className="text-red-800 underline">
          Volver
        </button>
      </div>
    );
  }

  return (
    <AnimalFormView
      animalId={id}
      initialData={animal}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={handleDelete}
      isSaving={isSaving}
      saveError={saveError}
      resources={resources}
    />
  );
}
