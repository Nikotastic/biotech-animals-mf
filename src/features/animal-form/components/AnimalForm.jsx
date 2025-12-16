import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimalFormView } from "./AnimalFormView";
import { useAnimalDetail } from "../../animal-detail/hooks/useAnimalDetail";
import { useAnimalMutation } from "../hooks/useAnimalMutation";
import { useToastStore } from "../../../shared/store/toastStore";

export default function AnimalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);

  // Read hook (shared/imported from detail)
  const {
    animal,
    loading: loadingData,
    error: loadError,
  } = useAnimalDetail(id || null);

  // Writing hook (specific to this feature)
  const { createAnimal, updateAnimal, isSaving, saveError } =
    useAnimalMutation();

  const handleSave = async (formData) => {
    try {
      if (id) {
        await updateAnimal(id, formData);
        addToast(`✅ Animal "${formData.name || 'sin nombre'}" actualizado correctamente`, "success");
      } else {
        await createAnimal(formData);
        addToast(`✅ Animal "${formData.name || 'sin nombre'}" creado correctamente`, "success");
      }
     // Redirect after success
      setTimeout(() => navigate("/animals"), 500);
    } catch (error) {
      console.error("Error saving:", error);
      const errorMessage = error.response?.data?.message || error.message;
      
      if (error.response?.status === 400) {
        addToast("⚠️ Datos inválidos. Verifica que todos los campos sean correctos", "warning");
      } else if (error.response?.status === 409) {
        addToast("❌ Ya existe un animal con ese identificador", "error");
      } else if (error.response?.status === 500) {
        addToast("❌ Error del servidor. Intenta nuevamente más tarde", "error");
      } else if (!error.response) {
        addToast("🔌 No se pudo conectar con el servidor", "error");
      } else {
        addToast(`❌ Error al guardar: ${errorMessage}`, "error");
      }
    }
  };

  const handleCancel = () => {
    navigate("/animals");
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
      isSaving={isSaving} // Pass prop to View to disable button while saving
      saveError={saveError} // Show save error if it occurs
    />
  );
}
