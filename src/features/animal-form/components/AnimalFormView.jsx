import React, { useState, useEffect } from "react";
import { Save, X, Upload, Camera } from "lucide-react";
import { motion } from "framer-motion";

export function AnimalFormView({
  animalId,
  initialData,
  onSave,
  onCancel,
  isSaving,
  saveError,
}) {
  const isEdit = !!animalId;

  // Local state of the form initialized with props or default values
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    identifier: initialData?.identifier || "",
    type: initialData?.type || "Bovino",
    breed: initialData?.breed || "",
    gender: initialData?.gender || "Macho",
    birthDate: initialData?.birthDate
      ? new Date(initialData.birthDate).toISOString().split("T")[0]
      : "",
    weight: initialData?.weight || "",
    height: initialData?.height || "",
    location: initialData?.location || "",
    motherId: initialData?.motherId || "",
    fatherId: initialData?.fatherId || "",
    status: initialData?.status || "Saludable",
    notes: initialData?.notes || "",
  });

  const [imagePreview, setImagePreview] = useState(initialData?.image || null);

  // Update state if new data arrives (in: asynchronous fetch)
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        birthDate: initialData.birthDate
          ? new Date(initialData.birthDate).toISOString().split("T")[0]
          : prev.birthDate,
      }));
      if (initialData.image) setImagePreview(initialData.image);
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6">
      {/* Header Hero Section */}
      <motion.div
        className="mb-8 relative overflow-hidden rounded-3xl group shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="relative h-40 bg-cover bg-center rounded-3xl"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-emerald-800/85 to-teal-900/90 rounded-3xl" />
          <div className="relative h-full flex items-center justify-between px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-white mb-2">
                {isEdit ? "Editar Animal" : "Registrar Nuevo Animal"}
              </h1>
              <p className="text-green-100">
                {isEdit
                  ? "Actualiza la información del animal seleccionado"
                  : "Completa el formulario para registrar un nuevo animal"}
              </p>
            </motion.div>

            <motion.button
              onClick={onCancel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all backdrop-blur-sm"
              title="Cancelar"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Save Error Alert */}
      {saveError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <X className="w-5 h-5" />
          <span>{saveError}</span>
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 border border-green-100"
      >
        <div className="space-y-8">
          {/* Image Upload Section */}
          <div>
            <label className="block text-green-900 font-semibold mb-3">
              Fotografía del Animal
            </label>
            <div className="flex items-center gap-6 flex-wrap">
              {/* Image Preview */}
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-green-200 bg-green-50 shadow-inner group">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-12 h-12 text-green-300 group-hover:text-green-400 transition-colors" />
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <div>
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-green-200 transition-all font-medium">
                    <Upload className="w-5 h-5" />
                    Subir Imagen
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-green-600 mt-2 text-sm">
                  JPG, PNG o WEBP (Max. 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-xl font-bold text-green-900 mb-6 pb-2 border-b border-green-100">
              Información Básica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                label="Nombre *"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ej: Luna"
                required
              />

              <InputGroup
                label="Identificador *"
                value={formData.identifier}
                onChange={(e) => handleChange("identifier", e.target.value)}
                placeholder="Ej: BOV-001"
                required
              />

              <div>
                <label className="block text-green-700 font-medium mb-2">
                  Tipo de Animal *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
                  required
                >
                  <option value="Bovino">Bovino</option>
                  <option value="Porcino">Porcino</option>
                  <option value="Ovino">Ovino</option>
                  <option value="Avicultura">Avicultura</option>
                </select>
              </div>

              <InputGroup
                label="Raza *"
                value={formData.breed}
                onChange={(e) => handleChange("breed", e.target.value)}
                placeholder="Ej: Holstein"
                required
              />

              <div>
                <label className="block text-green-700 font-medium mb-2">
                  Género *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
                  required
                >
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </div>

              <InputGroup
                label="Fecha de Nacimiento *"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleChange("birthDate", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Physical Characteristics */}
          <div>
            <h3 className="text-xl font-bold text-green-900 mb-6 pb-2 border-b border-green-100">
              Características Físicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup
                label="Peso (kg) *"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                placeholder="0.0"
                required
              />

              <InputGroup
                label="Altura (cm)"
                type="number"
                value={formData.height}
                onChange={(e) => handleChange("height", e.target.value)}
                placeholder="0"
              />

              <InputGroup
                label="Ubicación *"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Ej: Corral A-3"
                required
              />
            </div>
          </div>

          {/* Genealogy */}
          <div>
            <h3 className="text-xl font-bold text-green-900 mb-6 pb-2 border-b border-green-100">
              Genealogía
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                label="ID Madre"
                value={formData.motherId}
                onChange={(e) => handleChange("motherId", e.target.value)}
                placeholder="Ej: BOV-020"
              />

              <InputGroup
                label="ID Padre"
                value={formData.fatherId}
                onChange={(e) => handleChange("fatherId", e.target.value)}
                placeholder="Ej: BOV-015"
              />
            </div>
          </div>

          {/* Health Status */}
          <div>
            <h3 className="text-xl font-bold text-green-900 mb-6 pb-2 border-b border-green-100">
              Estado de Salud
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-700 font-medium mb-2">
                  Estado *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
                  required
                >
                  <option value="Saludable">Saludable</option>
                  <option value="En Tratamiento">En Tratamiento</option>
                  <option value="Observación">Observación</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-green-700 font-medium mb-2">
                  Notas Adicionales
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none bg-white text-gray-700"
                  placeholder="Observaciones, características especiales, etc..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse md:flex-row gap-4 pt-4 border-t border-green-50">
            <motion.button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              whileHover={{ scale: isSaving ? 1 : 1.02 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
              className="px-8 py-4 border-2 border-green-200 text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </motion.button>

            <motion.button
              type="submit"
              disabled={isSaving}
              whileHover={{ scale: isSaving ? 1 : 1.02 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{isEdit ? "Guardar Cambios" : "Registrar Animal"}</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}

// Helper component for inputs
function InputGroup({ label, ...props }) {
  return (
    <div>
      <label className="block text-green-700 font-medium mb-2">{label}</label>
      <input
        className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700 placeholder-green-300"
        {...props}
      />
    </div>
  );
}
