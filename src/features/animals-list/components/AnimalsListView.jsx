import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Download,
  Grid,
  List as ListIcon,
  Beef,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import alertService from "@shared/utils/alertService";

export function AnimalsListView({
  animals,
  onViewDetails,
  onEdit,
  onCreate,
  onDelete,
  actionLoading,
  onUpdateWeight,
  onMoveToBatch,
  onMarkAsSold,
  onMarkAsDead,
  onRegisterMovement,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const safeAnimals = Array.isArray(animals) ? animals : [];

  const filteredAnimals = safeAnimals.filter((animal) => {
    const name = animal.name || "";
    const identifier = animal.identifier || animal.visualCode || "";
    const type = animal.type || animal.categoryName || "";
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      identifier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Saludable":
        return "bg-green-100 text-green-700 border-green-200";
      case "En Tratamiento":
        return "bg-red-100 text-red-700 border-red-200";
      case "Observación":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getAnimalImage = (animal) => {
    if (animal.image && !animal.image.includes("placeholder"))
      return animal.image;

    const type = (animal.type || animal.categoryName || "").toLowerCase();
    if (
      type.includes("bovino") ||
      type.includes("vaca") ||
      type.includes("toro")
    )
      return "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=800&auto=format&fit=crop";
    if (type.includes("porcino") || type.includes("cerdo"))
      return "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800&auto=format&fit=crop";
    if (type.includes("ovino") || type.includes("oveja"))
      return "https://images.unsplash.com/photo-1484557939439-5838d70889ec?q=80&w=800&auto=format&fit=crop";
    if (
      type.includes("avicultura") ||
      type.includes("pollo") ||
      type.includes("gallina")
    )
      return "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800&auto=format&fit=crop";
    if (type.includes("equino") || type.includes("caballo"))
      return "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800&auto=format&fit=crop";

    return "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?q=80&w=800&auto=format&fit=crop";
  };

  return (
    <div className="w-full">
      {/* Header Hero Section */}
      <motion.div
        className="mb-8 relative overflow-hidden rounded-3xl group shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="relative h-48 bg-cover bg-center rounded-3xl transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-emerald-800/85 to-teal-900/90 rounded-3xl" />
          <div className="relative h-full flex flex-col justify-center px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between flex-wrap gap-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Beef className="w-8 h-8 text-green-300" />
                  <h1 className="text-3xl font-bold text-white">
                    Gestión de Animales
                  </h1>
                </div>
                <p className="text-green-100 text-lg">
                  Administra y monitorea el estado de tu ganado de forma
                  eficiente.
                </p>
              </div>

              <motion.button
                onClick={onCreate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white text-green-800 hover:bg-green-50 px-6 py-3 rounded-xl shadow-lg transition-all font-bold"
              >
                <Plus className="w-5 h-5" />
                <span>Agregar Animal</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Controls Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 mb-8 flex flex-col lg:flex-row gap-4 items-center"
      >
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, identificador o raza..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all outline-none"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Type Filter */}
          <div className="relative flex-1 sm:flex-none">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full sm:w-48 pl-10 pr-8 py-3 bg-gray-50 border-none rounded-xl text-gray-700 focus:ring-2 focus:ring-green-500/20 focus:bg-white cursor-pointer appearance-none transition-all outline-none"
            >
              <option value="all">Todos los tipos</option>
              <option value="Bovino">Bovinos</option>
              <option value="Porcino">Porcinos</option>
              <option value="Ovino">Ovinos</option>
              <option value="Avicultura">Avicultura</option>
            </select>
          </div>

          <div className="h-8 w-px bg-gray-200 hidden sm:block mx-1"></div>

          {/* View Mode */}
          <div className="flex bg-gray-50 p-1.5 rounded-xl gap-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Export */}
          <button
            className="p-3 bg-gray-50 rounded-xl text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors"
            title="Exportar"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Grid Content */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredAnimals.map((animal, index) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={getAnimalImage(animal)}
                    alt={animal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold text-gray-700 bg-white/90 backdrop-blur shadow-sm`}
                    >
                      {animal.type || animal.categoryName || "Bovino"}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold leading-none mb-1">
                      {animal.name}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">
                      {animal.identifier || animal.visualCode}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
                        animal.status === "Saludable"
                          ? "bg-green-500/20 text-green-100 border border-green-400/30"
                          : "bg-yellow-500/20 text-yellow-100 border border-yellow-400/30"
                      }`}
                    >
                      {animal.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between items-center text-gray-600">
                      <span className="font-medium">Raza</span>
                      <span className="text-gray-900 font-semibold">
                        {animal.breedName || animal.breed || "No especificada"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span className="font-medium">Peso</span>
                      <span className="text-gray-900 font-semibold text-emerald-600">
                        {animal.weight || animal.currentWeight || "0"} kg
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span className="font-medium">Ubicación</span>
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-bold border border-green-100">
                        {animal.location ||
                          animal.paddockName ||
                          "Sin ubicación"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onViewDetails(animal.id)}
                        className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 hover:bg-gray-100 py-2 rounded-xl font-semibold text-xs transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Detalles
                      </button>
                      <button
                        onClick={() => onEdit(animal.id)}
                        className="flex items-center justify-center gap-2 bg-green-50 text-green-700 hover:bg-green-100 py-2 rounded-xl font-semibold text-xs transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                    </div>
                    <button
                      onClick={async () => {
                        const result = await alertService.deleteConfirm(
                          animal.name,
                          "¿Estás seguro de eliminar este animal?"
                        );
                        if (result.isConfirmed) {
                          onDelete?.(animal.id);
                        }
                      }}
                      className="flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-xl font-semibold text-xs transition-colors w-full"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* List View */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100"
          >
            {/* Mobile Card View */}
            <div className="block md:hidden divide-y divide-gray-100">
              {filteredAnimals.map((animal, index) => (
                <motion.div
                  key={animal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-4 hover:bg-gray-50/50 transition-all"
                >
                  <div className="flex gap-4">
                    <img
                      src={getAnimalImage(animal)}
                      alt=""
                      className="w-20 h-20 rounded-xl object-cover shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-base truncate">
                            {animal.name}
                          </h4>
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md inline-block">
                            {animal.identifier || animal.visualCode}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(
                            animal.status
                          )}`}
                        >
                          {animal.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div>
                          <span className="text-gray-500">Tipo:</span>
                          <span className="text-gray-900 font-medium ml-1">
                            {animal.type || animal.categoryName || "Bovino"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Raza:</span>
                          <span className="text-gray-900 font-medium ml-1">
                            {animal.breed}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Peso:</span>
                          <span className="text-gray-900 font-medium ml-1">
                            {animal.weight} kg
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Ubicación:</span>
                          <span className="text-gray-900 font-medium ml-1">
                            {animal.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewDetails(animal.id)}
                          className="flex-1 flex items-center justify-center gap-1 p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Ver</span>
                        </button>
                        <button
                          onClick={() => onEdit(animal.id)}
                          className="flex-1 flex items-center justify-center gap-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all text-sm"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={async () => {
                            const result = await alertService.deleteConfirm(
                              animal.name,
                              "¿Estás seguro de eliminar este animal?"
                            );
                            if (result.isConfirmed) {
                              onDelete?.(animal.id);
                            }
                          }}
                          disabled={actionLoading}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left py-5 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      Identidad
                    </th>
                    <th className="text-left py-5 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      Detalles
                    </th>
                    <th className="text-left py-5 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      Peso / Ubicación
                    </th>
                    <th className="text-left py-5 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="text-right py-5 px-8 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredAnimals.map((animal, index) => (
                    <motion.tr
                      key={animal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-gray-50/50 transition-all"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={getAnimalImage(animal)}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover shadow-sm"
                          />
                          <div>
                            <h4 className="font-bold text-gray-900 text-base">
                              {animal.name}
                            </h4>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                              {animal.identifier || animal.visualCode}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-medium">
                            {animal.type || animal.categoryName || "Bovino"}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {animal.breed}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-sm text-gray-700">
                            {animal.weight} kg
                          </span>
                          <span className="text-xs text-gray-400">
                            {animal.location}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            animal.status
                          )}`}
                        >
                          {animal.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => onViewDetails(animal.id)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => onEdit(animal.id)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={async () => {
                              const result = await alertService.deleteConfirm(
                                animal.name,
                                "¿Estás seguro de eliminar este animal?"
                              );
                              if (result.isConfirmed) {
                                onDelete?.(animal.id);
                              }
                            }}
                            disabled={actionLoading}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
