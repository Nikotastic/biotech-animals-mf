import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimalsListView } from "./AnimalsListView";
import { useAnimals } from "../hooks/useAnimals";

export default function AnimalsList() {
  const navigate = useNavigate();
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

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 inline-block">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={refetch}
            className="mt-2 text-sm underline hover:text-red-800"
          >
            Reintentar
          </button>
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
