import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ReadRecipe() {
  const { id } = useParams(); // extract the recipe ID from the URL
  const userId = window.localStorage.getItem("id"); // Get the user ID from local storage
  const username = window.localStorage.getItem("username");
  const [recipe, setRecipe] = useState({});
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const getRecipe = () => {
      axios
        .get(
          `https://recipe-share-server-brown.vercel.app/recipe/recipe-by-id/${id}`
        )
        .then((result) => {
          setRecipe(result.data);
        })
        .catch((err) => console.log(err));
    };

    const fetchSavedRecipes = () => {
      if (userId === null) return;
      axios
        .get(
          `https://recipe-share-server-brown.vercel.app/recipe/saved-recipes/${userId}`
        )
        .then((result) => {
          // console.log(result.data);
          setSavedRecipes(result.data);
        })
        .catch((err) => console.log(err));
    };

    fetchSavedRecipes();
    getRecipe();
  }, []);

  const saveRecipes = (recipeId) => {
    if (!userId) {
      console.error("User is not logged in. Cannot save recipe.");
      return;
    }
    axios
      .put("https://recipe-share-server-brown.vercel.app/recipe/", {
        userId,
        recipeId,
      })
      .then((result) => {
        // console.log(result);
        setSavedRecipes(result.data.savedRecipes);
      })
      .catch((err) => console.log(err));
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  const unsaveRecipe = (recipeId) => {
    if (!userId) {
      console.error("User is not logged in. Cannot unsave recipe.");
      return;
    }

    axios
      .put(
        "https://recipe-share-server-brown.vercel.app/recipe/unsave-recipe",
        { userId, recipeId }
      )
      .then((result) => {
        setSavedRecipes(result.data.savedRecipes);
      })
      .catch((err) => console.log(err));
  };

  const deleteRecipe = (recipeId) => {
    if (!userId) {
      console.error("User is not logged in. Cannot delete recipe.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    axios
      .delete(
        `https://recipe-share-server-brown.vercel.app/recipe/delete-recipe/${recipeId}`,
        {
          data: { userId }, // Pass the userId in the request body
        }
      )
      .then(() => {
        alert("Recipe deleted successfully.");
        // window.location.href = "/"; // Redirect to home or another page
        navigate("/"); // Redirect to home
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete recipe.");
      });
  };

  return (
    // <div className="d-flex justify-content-center container mt-3">
    //   <div className="p-2">
    //     <img
    //       src={recipe.imageUrl}
    //       alt={recipe.name}
    //       className="img-fluid rounded shadow"
    //       style={{
    //         maxHeight: "300px",
    //         objectFit: "cover",
    //         minWidth: "350px",
    //         minHeight: "300px",
    //       }}
    //     />
    //   </div>
    //   <div className="p-2">
    //     <h2>{recipe.name}</h2>
    //     <p>
    //       Posted By: {recipe.postedBy === username ? "You" : recipe.postedBy}
    //     </p>{" "}
    //     {/* Display "Posted By" */}
    //     {userId ? (
    //       isRecipeSaved(recipe._id) ? (
    //         <button
    //           className="btn btn-danger"
    //           onClick={() => unsaveRecipe(recipe._id)}
    //         >
    //           Unsave
    //         </button>
    //       ) : (
    //         <button
    //           className="btn btn-success"
    //           onClick={() => saveRecipes(recipe._id)}
    //           disabled={isRecipeSaved(recipe._id)}
    //         >
    //           Save
    //         </button>
    //       )
    //     ) : (
    //       <p className="text-muted">Log in to save recipes.</p>
    //     )}
    //     <h4>Description</h4>
    //     <p>{recipe.description}</p>
    //     <h4>Ingredients</h4>
    //     <p>{recipe.ingredients}</p>
    //     {recipe.userId === userId && (
    //       <>
    //         <button className="btn btn-warning me-2">
    //           <Link
    //             to={`/recipe/edit-recipe/${recipe._id}`}
    //             className="text-decoration-none text-white"
    //           >
    //             Edit Recipe
    //           </Link>
    //         </button>
    //         <button
    //           className="btn btn-danger"
    //           onClick={() => deleteRecipe(recipe._id)}
    //         >
    //           Delete Recipe
    //         </button>
    //       </>
    //     )}
    //   </div>
    // </div>
    <div className="container mt-5">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "300px",
              objectFit: "cover",
              width: "100%",
            }}
          />
        </div>
        <div className="col-12 col-md-6">
          <h2>{recipe.name}</h2>
          <p className="text-muted">
            <strong>Posted By:</strong>{" "}
            {recipe.postedBy === username ? "You" : recipe.postedBy}
          </p>
          {userId ? (
            isRecipeSaved(recipe._id) ? (
              <button
                className="btn btn-danger mb-3"
                onClick={() => unsaveRecipe(recipe._id)}
              >
                Unsave <i class="bi bi-arrow-through-heart-fill"></i>
              </button>
            ) : (
              <button
                className="btn btn-success mb-3"
                onClick={() => saveRecipes(recipe._id)}
              >
                Save <i class="bi bi-bookmark-heart-fill"></i>
              </button>
            )
          ) : (
            <p className="text-muted">Log in to save recipes.</p>
          )}
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">Description</h4>
              <p className="card-text">{recipe.description}</p>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">Ingredients</h4>
              <p className="card-text lead">{recipe.ingredients}</p>
            </div>
          </div>
          {recipe.userId === userId && (
            <div>
              <Link
                to={`/recipe/edit-recipe/${recipe._id}`}
                className="btn btn-warning me-2 text-white text-decoration-none"
              >
                Edit Recipe <i class="bi bi-pencil-square"></i>
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => deleteRecipe(recipe._id)}
              >
                Delete Recipe <i class="bi bi-trash3"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReadRecipe;
