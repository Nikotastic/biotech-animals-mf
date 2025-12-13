import { useAnimals } from '../hooks/useAnimals'
import { useNavigate } from 'react-router-dom'

export default function AnimalsList() {
  const { animals, loading, error, deleteAnimal } = useAnimals()
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este animal?')) {
      try {
        await deleteAnimal(id)
      } catch (err) {
        alert('Error al eliminar el animal')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Animales</h1>
        <button
          onClick={() => navigate('/animals/new')}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          + Nuevo Animal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <div key={animal.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{animal.name}</h3>
                <p className="text-sm text-gray-500">ID: {animal.identifier}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {animal.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Tipo:</span> {animal.type}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Raza:</span> {animal.breed}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Edad:</span> {animal.age} meses
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Peso:</span> {animal.weight} kg
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/animals/${animal.id}`)}
                className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                Ver Detalle
              </button>
              <button
                onClick={() => handleDelete(animal.id)}
                className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {animals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay animales registrados</p>
        </div>
      )}
    </div>
  )
}