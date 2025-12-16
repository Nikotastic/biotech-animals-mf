import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAnimalDetail } from "../hooks/useAnimalDetail";
import { AnimalDetailView } from "./AnimalDetailView";

export default function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animal, loading, error } = useAnimalDetail(id);

  const handleBack = () => navigate("/animals");
  const handleEdit = () => navigate(`/animals/edit/${id}`);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-green-200 rounded-full animate-ping"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh] p-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-700 mb-2">
            Error al cargar
          </h3>
          <p className="text-red-600 mb-6">
            {error || "No se pudo encontrar la información del animal."}
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-md shadow-red-200"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  // If there is no loading or error but no animal, we show generic error
  if (!animal) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Animal no encontrado
          </h2>
          <button
            onClick={handleBack}
            className="text-green-600 font-medium hover:underline"
          >
            Regresar al listado
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimalDetailView animal={animal} onBack={handleBack} onEdit={handleEdit} />
  );
}
