import React, { useState, useEffect } from "react";
import PlantList from "./components/PlantList";
import NewPlantForm from "./components/NewPlantForm";
import Search from "./components/Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPlants(data))
      .catch((error) => {
        console.error("Error fetching plants:", error);
        setError("Failed to load plants. Please check the backend.");
      });
  }, []);

  function handleAddPlant(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  }

  function handleUpdatePlant(updatedPlant) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) => (plant.id === updatedPlant.id ? updatedPlant : plant))
    );
  }

  function handleDeletePlant(id) {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Plantsy</h1>
      <Search setSearchTerm={setSearchTerm} />
      <NewPlantForm onAddPlant={handleAddPlant} />
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <PlantList plants={filteredPlants} onUpdatePlant={handleUpdatePlant} onDeletePlant={handleDeletePlant} />
      )}
    </div>
  );
}

export default App;
