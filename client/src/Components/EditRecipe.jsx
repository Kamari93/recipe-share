import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function EditRecipe() {
  const { id } = useParams(); // Get the recipe ID from the URL
  const userId = window.localStorage.getItem("id");
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    imageUrl: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/recipe/recipe-by-id/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/recipe/edit-recipe/${id}`, {
        ...recipe,
        userId,
      })
      .then(() => {
        alert("Recipe updated successfully!");
        navigate(`/read-recipe/${id}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className=" mb-5 container mt-5 w-50 ">
      <h2 className="mb-4">Edit Recipe</h2>
      <form
        className="p-4 border rounded shadow-sm bg-light"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={recipe.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={recipe.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          <textarea
            name="ingredients"
            className="form-control"
            rows="6"
            value={recipe.ingredients}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            className="form-control"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Update Recipe
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRecipe;
