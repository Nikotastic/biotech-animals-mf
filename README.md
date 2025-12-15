# 🐄 BioTech Animals - Gestión de Animales

Módulo de gestión de inventario de animales para el ERP BioTech.

## 🚀 Características

- **Lista de animales**: Visualización completa del inventario
- **Registro de animales**: Alta de nuevos ejemplares
- **Edición de datos**: Actualización de información
- **Seguimiento**: Historial completo por animal
- **Filtros avanzados**: Por tipo, raza, edad, estado
- **Tarjetas individuales**: Vista detallada por animal
- **Eliminación**: Baja de animales (soft delete)

## 🛠️ Tecnologías

- React 18
- Vite + Module Federation
- React Hook Form + Yup
- Axios
- Zustand
- Tailwind CSS

## 📦 Instalación

```bash
npm install
npm run dev  # Puerto 5002
```

## 🔌 Componentes Expuestos

```javascript
// Lista de animales
import('animalsMF/AnimalsList')

// Detalle de animal
import('animalsMF/AnimalDetail')

// Formulario de animal
import('animalsMF/AnimalForm')

// Store de animales
import('animalsMF/AnimalsStore')
```

## 📁 Estructura

```
src/
├── features/
│   ├── animals-list/
│   │   ├── components/
│   │   │   └── AnimalsList.jsx
│   │   ├── hooks/
│   │   │   └── useAnimals.js
│   │   └── services/
│   │       └── animalsListService.js
│   ├── animal-detail/
│   │   ├── components/
│   │   └── hooks/
│   └── animal-form/
│       ├── components/
│       │   └── AnimalForm.jsx
│       ├── validations/
│       │   └── animalSchema.js
│       └── services/
├── shared/
│   ├── store/
│   │   └── animalsStore.js
│   ├── constants/
│   │   └── animalTypes.js
│   └── utils/
└── App.jsx
```

## 🐮 Tipos de Animales

```javascript
export const ANIMAL_TYPES = {
  BOVINO: 'Bovino',
  PORCINO: 'Porcino',
  OVINO: 'Ovino',
  CAPRINO: 'Caprino',
  AVIAR: 'Aviar'
}

export const ANIMAL_STATUS = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  SOLD: 'Vendido',
  DECEASED: 'Fallecido'
}
```

## 🌍 API Endpoints

```javascript
GET    /api/animals              // Lista de animales
GET    /api/animals/:id          // Detalle de animal
POST   /api/animals              // Crear animal
PUT    /api/animals/:id          // Actualizar animal
DELETE /api/animals/:id          // Eliminar animal
GET    /api/animals/stats        // Estadísticas
```

## 📝 Schema de Validación

```javascript
{
  name: string().required(),
  identifier: string().required(),
  type: string().required(),
  breed: string().required(),
  age: number().positive().required(),
  weight: number().positive().required(),
  status: string().required()
}
```

## 🎨 Uso del Store

```javascript
import { useAnimalsStore } from 'animalsMF/AnimalsStore'

const { 
  animals, 
  setAnimals, 
  selectedAnimal, 
  setSelectedAnimal 
} = useAnimalsStore()
```

## 📊 Datos del Animal

```typescript
interface Animal {
  id: number
  name: string
  identifier: string  // ID único del animal
  type: string        // Tipo de animal
  breed: string       // Raza
  age: number         // Edad en meses
  weight: number      // Peso en kg
  gender: string      // Género
  birthDate: Date     // Fecha de nacimiento
  status: string      // Estado actual
  origin: string      // Origen/procedencia
  motherId?: number   // ID de la madre
  fatherId?: number   // ID del padre
  notes?: string      // Observaciones
}
```

## 🔍 Filtros Disponibles

- Por tipo de animal
- Por raza
- Por rango de edad
- Por rango de peso
- Por estado
- Búsqueda por nombre/identificador

## 📈 Estadísticas

- Total de animales
- Por tipo y raza
- Por rangos de edad
- Promedio de peso
- Estado de salud general

## 🚀 Deploy

```bash
npm run build
vercel --prod
```

## 🔗 Integración con otros módulos

### Con Health MF
```javascript
// Acceso a registros de salud del animal
GET /api/animals/:id/health
```

### Con Reproduction MF
```javascript
// Historial reproductivo
GET /api/animals/:id/reproduction
```

### Con Feeding MF
```javascript
// Plan de alimentación
GET /api/animals/:id/feeding
```

## 📞 Contacto

- Email: animals@biotech.com
- Docs: https://docs.biotech.com/animals
```