import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({ name: "", image: "", price: "" });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, price: parseFloat(formData.price) }),
    })
      .then((res) => res.json())
      .then(onAddPlant);
    setFormData({ name: "", image: "", price: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Plant Name" required />
      <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;