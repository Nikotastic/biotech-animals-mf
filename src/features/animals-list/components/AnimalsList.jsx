import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimalsListView } from "./AnimalsListView";
import { useAnimals } from "../hooks/useAnimals";
import { useAuthStore } from "@shared/store/authStore";

export default function AnimalsList() {
  const navigate = useNavigate();
  const selectedFarm = useAuthStore((state) => state.selectedFarm);
  const {
    animals,
    loading,
    error,
    actionLoading,
    refetch,
    updateWeight,
    moveToBatch,
    markAsSold,
    markAsDead,
    registerMovement,
    deleteAnimal,
  } = useAnimals();

  const handleCreate = () => {
    navigate("/animals/create");
  };

  const handleViewDetails = (id) => {
    navigate(`/animals/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/animals/edit/${id}`);
  };

  // Check if no farm is selected
  if (!selectedFarm?.id) {
    return (
      <div className="p-8 text-center">
        <div className="bg-yellow-50 text-yellow-800 p-6 rounded-xl border border-yellow-200 inline-block max-w-md">
          <p className="font-bold text-lg mb-2">⚠️ Granja no seleccionada</p>
          <p className="mb-4">Por favor selecciona una granja para ver los animales.</p>
          <button
            onClick={() => navigate("/farm-selector")}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Seleccionar Granja
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-green-100 rounded-full animate-ping"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-green-600 border-green-200 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }


  return (
    <AnimalsListView
      animals={animals}
      actionLoading={actionLoading}
      onCreate={handleCreate}
      onViewDetails={handleViewDetails}
      onEdit={handleEdit}
      onUpdateWeight={updateWeight}
      onMoveToBatch={moveToBatch}
      onMarkAsSold={markAsSold}
      onMarkAsDead={markAsDead}
      onRegisterMovement={registerMovement}
      onDelete={deleteAnimal}
    />
  );
}
