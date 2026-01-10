# Fix: Filtrado de Datos Mock por Granja

Esta rama `fix/mock-data-filtering` soluciona un problema crítico al trabajar en entorno local con datos simulados (Mocks).

## 🐛 El Problema

El servicio `animalService.js` utilizaba un conjunto de datos estáticos (`MOCK_ANIMALS`) donde cada animal estaba asignado a una granja específica (`demo-farm-id`).
Al iniciar sesión y seleccionar cualquier otra granja (o si el ID de la granja generada no coincidía exactamente), el filtro `farmId` descartaba todos los resultados, mostrando la lista de animales vacía.

## 🛠 La Solución

Se modificó la lógica de filtrado en el método `getAnimals` dentro de `src/shared/services/animalService.js`.

Ahora, cuando se solicita filtrar por `farmId` en modo mock:

1.  Se toman los animales de prueba existentes.
2.  **Se sobrescribe dinámicamente** su propiedad `farmId` para que coincida con el ID de la granja que estás visualizando actualmente.

## ✅ Resultado

Siempre se visualizan datos de prueba (Vaca Bella, Toro Max, etc.) independientemente de la granja seleccionada, facilitando el desarrollo y pruebas de la interfaz sin necesidad de coincidencia exacta de IDs en la base de datos simulada.
