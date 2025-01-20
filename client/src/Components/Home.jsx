import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("all"); // Track the current filter
  const [currentPage, setCurrentPage] = useState(1); // Track the current page for pagination
  const [recipesPerPage] = useState(8); // Number of recipes per page
  const username = localStorage.getItem("username");
  useEffect(() => {
    axios
      .get("http://localhost:5000/recipe/recipes")
      .then((recipes) => {
        setRecipes(recipes.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Compute filtered recipes and counts
  const userRecipes = recipes.filter((recipe) => recipe.postedBy === username);
  const filteredRecipes = filter === "all" ? recipes : userRecipes; //the conditional sets filteredRecipes to recipes if filter is all, or userRecipes if filter is user

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  // Calculate indices for the current page
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h1>Recipes</h1>
      {/* Filter Buttons */}
      {
        /* only display your recipes buttons if user is logged in */
        recipes.length > 0 && username && (
          <div className="mb-4">
            <button
              className={`btn btn-warning me-2 text-white ${
                filter === "all" ? "active" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              All Posts ({recipes.length})
            </button>

            <button
              className={`btn btn-warning text-white ${
                filter === "user" ? "active" : ""
              }`}
              onClick={() => setFilter("user")}
            >
              Your Posts ({userRecipes.length})
            </button>
          </div>
        )
      }
      {/* Recipes List */}
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {currentRecipes.map((recipe) => (
            // <div key={recipe._id} className="mt-4 p-3 border">
            //   <Link
            //     to={`/read-recipe/${recipe._id}`}
            //     className="text-decoration-none text-warning"
            //   >
            //     <h3>{recipe.name}</h3>
            //   </Link>
            //   <img
            //     src={recipe.imageUrl}
            //     alt={recipe.name}
            //     className="img-fluid rounded shadow"
            //     style={{ maxHeight: "300px", objectFit: "cover" }}
            //   />
            //   <p>
            //     Posted By:{" "}
            //     {recipe.postedBy === username ? "You" : recipe.postedBy}
            //   </p>
            // </div>
            <div className="col" key={recipe._id}>
              <div className="card mb-4 shadow-sm" style={{ width: "18rem" }}>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <Link
                    to={`/read-recipe/${recipe._id}`}
                    className="text-decoration-none text-warning"
                  >
                    <h5 className="card-title">
                      {truncateTitle(recipe.name, 20)}
                    </h5>
                  </Link>
                  <p className="card-text">
                    Posted By:{" "}
                    {recipe.postedBy === username ? "You" : recipe.postedBy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* No Recipes Message */}
      {filteredRecipes.length === 0 && (
        <div className="text-center mt-5">
          <p>No recipes to display. Why not create one?</p>
          <Link to="/recipe/create-recipe" className="btn btn-warning">
            Create Recipe
          </Link>
        </div>
      )}
      {/* Pagination Controls */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center gap-2">
          {[...Array(Math.ceil(recipes.length / recipesPerPage)).keys()].map(
            (page) => (
              <li
                key={page}
                className={`page-item ${
                  currentPage === page + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link btn bg-warning text-white"
                  onClick={() => paginate(page + 1)}
                >
                  {page + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Home;
