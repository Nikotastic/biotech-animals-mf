import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AnimalsList from "./features/animals-list/components/AnimalsList";
import AnimalDetail from "./features/animal-detail/components/AnimalDetail";
import AnimalForm from "./features/animal-form/components/AnimalForm";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/animals" />} />
          <Route path="/animals" element={<AnimalsList />} />
          <Route path="/animals/create" element={<AnimalForm />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
          <Route path="/animals/edit/:id" element={<AnimalForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
