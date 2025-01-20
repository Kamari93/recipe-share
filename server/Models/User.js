const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }], // Reference to saved recipes store the recipe id
});

const UserModel = mongoose.model("users", userSchema, "users");

module.exports = UserModel;
