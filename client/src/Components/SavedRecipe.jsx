import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import RecipeCard from "./RecipeCard";

function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = window.localStorage.getItem("id");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (!userId) {
      navigate("/auth/login"); // Redirect to login if not logged in
      return;
    }
    axios
      .get(
        `https://recipe-share-server-brown.vercel.app/recipe/user-recipes/${userId}`
      )
      .then((recipes) => {
        setSavedRecipes(recipes.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!userId) {
    return (
      <h3 className="text-center mt-4">
        Please log in to view your saved recipes.
      </h3>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Saved Recipes</h1>

      {savedRecipes.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {savedRecipes.map((recipe) => (
            <div className="col" key={recipe._id}>
              <RecipeCard recipe={recipe} username={recipe.name} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <p>No saved recipes yet. Start saving your favorites!</p>
          <Link to="/" className="btn btn-warning">
            Browse Recipes
          </Link>
        </div>
      )}
    </div>
  );
}

export default SavedRecipe;
