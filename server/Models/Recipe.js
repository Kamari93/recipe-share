const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  ingredients: { type: String },
  imageUrl: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  postedBy: { type: String, default: "Bruce Lee" }, // New field to store the username
});

const RecipeModel = mongoose.model("recipes", recipeSchema);

module.exports = RecipeModel;
