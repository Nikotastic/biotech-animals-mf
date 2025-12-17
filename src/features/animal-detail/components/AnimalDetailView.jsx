import React, { useState } from "react";
import {
  ArrowLeft,
  Edit2,
  Calendar,
  Activity,
  Heart,
  TrendingUp,
  MapPin,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimalDetailView({ animal, onBack, onEdit }) {
  const [activeTab, setActiveTab] = useState("general");

  // Default values ​​if data is missing
  const displayAnimal = {
    name: animal?.name || "Sin Nombre",
    identifier: animal?.identifier || animal?.visualCode || "N/A",
    type: animal?.type || animal?.categoryName || "Desconocido",
    breed: animal?.breed || animal?.breedName || "Desconocida",
    gender:
      animal?.gender ||
      (animal?.sex === "M"
        ? "Macho"
        : animal?.sex === "F"
        ? "Hembra"
        : animal?.sex) ||
      "N/A",
    birthDate: animal?.birthDate
      ? new Date(animal.birthDate).toLocaleDateString()
      : "N/A",
    weight: animal?.weight || 0,
    height: animal?.height || 0,
    status: animal?.status || animal?.currentStatus || "Desconocido",
    location: animal?.location || animal?.paddockName || "Sin asignar",
    motherId: animal?.motherId || "N/A",
    fatherId: animal?.fatherId || "N/A",
    image:
      animal?.image ||
      "https://images.unsplash.com/photo-1616842610498-6c5f606d69f9?w=800",
  };

  // Mock records if they do not exist
  const healthRecords = animal?.healthRecords || [
    {
      date: "2024-12-01",
      type: "Vacunación",
      description: "Registro de ejemplo",
      veterinarian: "N/A",
    },
  ];

  const weightHistory = animal?.weightHistory || [
    { date: "Actual", weight: displayAnimal.weight },
  ];

  const tabs = [
    { id: "general", label: "General", icon: Activity },
    { id: "health", label: "Salud", icon: Heart },
    { id: "reproduction", label: "Reproducción", icon: Users },
    { id: "history", label: "Historial", icon: Calendar },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-green-50 text-green-600 rounded-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-green-900 mb-1">
              {displayAnimal.name}
            </h1>
            <p className="text-green-600 font-medium tracking-wide">
              {displayAnimal.identifier} - {displayAnimal.breed}
            </p>
          </div>
        </div>

        <motion.button
          onClick={onEdit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-green-200 transition-all font-medium"
        >
          <Edit2 className="w-5 h-5" />
          Editar
        </motion.button>
      </div>

      {/* Animal Card with Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100"
      >
        <div className="grid md:grid-cols-3 gap-0">
          {/* Image */}
          <div className="relative h-72 md:h-auto overflow-hidden group">
            <img
              src={displayAnimal.image}
              alt={displayAnimal.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            <div className="absolute top-4 right-4">
              <span className="px-4 py-2 bg-white/90 text-green-700 font-bold rounded-full border border-green-200 backdrop-blur-md shadow-sm">
                {displayAnimal.status}
              </span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="md:col-span-2 p-8 bg-gradient-to-br from-white to-green-50/30">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Resumen
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              <InfoItem
                icon={Activity}
                color="blue"
                label="Tipo"
                value={displayAnimal.type}
              />
              <InfoItem
                icon={Users}
                color="purple"
                label="Género"
                value={displayAnimal.gender}
              />
              <InfoItem
                icon={Calendar}
                color="orange"
                label="Nacimiento"
                value={displayAnimal.birthDate}
              />
              <InfoItem
                icon={TrendingUp}
                color="green"
                label="Peso"
                value={`${displayAnimal.weight} kg`}
              />
              <InfoItem
                icon={Activity}
                color="teal"
                label="Altura"
                value={`${displayAnimal.height} cm`}
              />
              <InfoItem
                icon={MapPin}
                color="pink"
                label="Ubicación"
                value={displayAnimal.location}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden min-h-[400px]">
        {/* Tab Headers */}
        <div className="flex overflow-x-auto border-b border-green-100 bg-gray-50/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-5 px-6 transition-all font-medium text-sm md:text-base whitespace-nowrap outline-none ${
                activeTab === tab.id
                  ? "bg-white border-b-2 border-green-600 text-green-700 shadow-sm"
                  : "text-gray-500 hover:text-green-600 hover:bg-green-50/50"
              }`}
            >
              <tab.icon
                className={`w-5 h-5 ${
                  activeTab === tab.id ? "text-green-600" : "text-gray-400"
                }`}
              />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "general" && (
                <div className="space-y-8">
                  <SectionTitle>Información Genética</SectionTitle>
                  <div className="grid md:grid-cols-2 gap-6">
                    <DetailCard
                      label="Identificador"
                      value={displayAnimal.identifier}
                      bg="bg-green-50"
                      border="border-green-100"
                    />
                    <DetailCard
                      label="Raza"
                      value={displayAnimal.breed}
                      bg="bg-blue-50"
                      border="border-blue-100"
                    />
                    <DetailCard
                      label="ID Madre"
                      value={displayAnimal.motherId}
                      bg="bg-purple-50"
                      border="border-purple-100"
                    />
                    <DetailCard
                      label="ID Padre"
                      value={displayAnimal.fatherId}
                      bg="bg-orange-50"
                      border="border-orange-100"
                    />
                  </div>
                </div>
              )}

              {activeTab === "health" && (
                <div className="space-y-6">
                  <SectionTitle>Registros Clínicos</SectionTitle>
                  {healthRecords.map((record, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                          <Heart className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {record.type}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            {record.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {record.date}
                        </div>
                        <p className="text-xs text-green-600 mt-2 font-medium">
                          Vet: {record.veterinarian}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "weight" && (
                <div className="space-y-6">
                  <SectionTitle>Control de Peso</SectionTitle>
                  <div className="space-y-3">
                    {weightHistory.map((record, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                          <span className="font-medium text-gray-700">
                            {record.date}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-green-700">
                          {record.weight} kg
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div className="space-y-6">
                  <SectionTitle>Línea de Tiempo</SectionTitle>
                  <div className="relative border-l-2 border-green-200 ml-3 md:ml-6 space-y-8 py-2">
                    {healthRecords.map((record, idx) => (
                      <div key={idx} className="relative pl-8 md:pl-10">
                        <div className="absolute -left-[9px] w-5 h-5 bg-white rounded-full border-4 border-green-500 shadow-sm" />
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-green-800">
                              {record.type}
                            </span>
                            <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">
                              {record.date}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {record.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "reproduction" && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                    <Users className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Sin registros
                  </h3>
                  <p className="text-gray-500 max-w-xs mx-auto">
                    No hay información reproductiva disponible para este animal.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Subcomponentes para props display
function InfoItem({ icon: Icon, color, label, value }) {
  const colorClasses = {
    blue: { bg: "bg-blue-50", text: "text-blue-600" },
    purple: { bg: "bg-purple-50", text: "text-purple-600" },
    orange: { bg: "bg-orange-50", text: "text-orange-600" },
    green: { bg: "bg-green-50", text: "text-green-600" },
    teal: { bg: "bg-teal-50", text: "text-teal-600" },
    pink: { bg: "bg-pink-50", text: "text-pink-600" },
  }[color] || { bg: "bg-gray-50", text: "text-gray-600" };

  return (
    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div
        className={`w-12 h-12 ${colorClasses.bg} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm`}
      >
        <Icon className={`w-6 h-6 ${colorClasses.text}`} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
        <p className="text-gray-900 font-bold text-lg leading-tight">{value}</p>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-lg font-bold text-gray-800 border-l-4 border-green-500 pl-3 uppercase tracking-wide">
      {children}
    </h3>
  );
}

function DetailCard({ label, value, bg, border }) {
  return (
    <div className={`p-6 ${bg} border ${border} rounded-2xl`}>
      <p className="text-green-700/70 text-sm font-bold uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="text-gray-900 font-bold text-xl">{value}</p>
    </div>
  );
}
