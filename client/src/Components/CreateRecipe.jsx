import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const userId = window.localStorage.getItem("id"); // Get the user ID from local storage
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    imageUrl: "",
    // userId: window.localStorage.getItem("id"), // Get the user ID from local storage
    userId: userId, // Get the user ID from local storage
  });
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value }); // use spread operator to update the state for each input
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please log in to create recipes.");
      return;
    }

    axios
      .post("http://localhost:5000/recipe/create-recipe", recipe)
      .then((result) => {
        console.log(result.data);
        alert("Recipe Created");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  if (!userId) {
    return (
      <h3 className="text-center mt-4">Please log in to create recipes.</h3>
    );
  }

  return (
    <div className="mb-5 container mt-5 w-50">
      <h2 className="mb-4">Create Recipe</h2>
      <div className="p-4 border rounded shadow-sm bg-light">
        <form onSubmit={handleSubmit}>
          <div>
            <label labelfor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label labelfor="description">Description</label>
            <textarea
              type="text"
              placeholder="Enter Description"
              className="form-control"
              name="description"
              rows="6"
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label labelfor="ingredients">Ingredients</label>
            <textarea
              type="text"
              placeholder="Enter Ingredients"
              className="form-control"
              name="ingredients"
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label labelfor="imageUrl">Image URL</label>
            <input
              type="text"
              placeholder="Enter URL"
              className="form-control"
              name="imageUrl"
              onChange={handleChange}
            ></input>
          </div>
          <button className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
