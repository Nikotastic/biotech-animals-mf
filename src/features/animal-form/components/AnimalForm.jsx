import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimalFormView } from "./AnimalFormView";
import { useAnimalDetail } from "../../animal-detail/hooks/useAnimalDetail";
import { useAnimalMutation } from "../hooks/useAnimalMutation";

export default function AnimalForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hook de lectura (compartido/importado de detalle)
  const {
    animal,
    loading: loadingData,
    error: loadError,
  } = useAnimalDetail(id || null);

  // Hook de escritura (propio de este feature)
  const { createAnimal, updateAnimal, isSaving, saveError } =
    useAnimalMutation();

  const handleSave = async (formData) => {
    try {
      if (id) {
        await updateAnimal(id, formData);
      } else {
        await createAnimal(formData);
      }
      // Redirect tras éxito
      navigate("/animals");
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleCancel = () => {
    navigate("/animals");
  };

  // Loading state para carga inicial de datos (solo en edición)
  if (id && loadingData) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Error state para carga inicial
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
      isSaving={isSaving} // Pasar prop al View para deshabilitar botón mientras guarda
      saveError={saveError} // Mostrar error de guardado si ocurre
    />
  );
}
