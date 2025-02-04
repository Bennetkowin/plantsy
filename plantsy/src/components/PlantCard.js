import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [price, setPrice] = useState(plant.price);
  const [soldOut, setSoldOut] = useState(false);

  function handlePriceChange(event) {
    const newPrice = event.target.value;
    setPrice(newPrice);
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((res) => res.json())
      .then(onUpdatePlant);
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => onDeletePlant(plant.id));
  }

  return (
    <li>
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${price}</p>
      <input type="number" value={price} onChange={handlePriceChange} />
      <button onClick={() => setSoldOut(!soldOut)}>{soldOut ? "Sold Out" : "In Stock"}</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;