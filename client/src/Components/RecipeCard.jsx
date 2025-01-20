import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const truncateTitle = (title, maxLength) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};
const RecipeCard = ({ recipe, username }) => (
  <div
    className="card mb-4 shadow-sm"
    style={{ width: "18rem" }}
    key={recipe._id}
  >
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
        <h5 className="card-title">{truncateTitle(recipe.name, 20)}</h5>
      </Link>
      <p className="card-text">
        Posted By: {recipe.postedBy === username ? "You" : recipe.postedBy}
      </p>
    </div>
  </div>
);

// Adding PropTypes for validation
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    postedBy: PropTypes.string.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
};

export default RecipeCard;
