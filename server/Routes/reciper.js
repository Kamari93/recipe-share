const express = require("express");
const RecipeModel = require("../Models/Recipe");
const UserModel = require("../Models/User");
const router = express.Router();

// router.post("/create-recipe", async (req, res) => {
//   RecipeModel.create({
//     name: req.body.name,
//     description: req.body.description,
//     ingredients: req.body.ingredients,
//     imageUrl: req.body.imageUrl,
//     userId: req.body.userId,
//   })
//     .then((result) => {
//       return res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.post("/create-recipe", async (req, res) => {
  try {
    // Find the user associated with the userId
    const user = await UserModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the recipe with the postedBy field
    const recipe = await RecipeModel.create({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      imageUrl: req.body.imageUrl,
      userId: req.body.userId,
      postedBy: user.username || "Bruce Lee", // Assuming `username` exists in UserModel Bruce Lee is the first user
    });

    return res.json(recipe);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create recipe" });
  }
});

router.get("/recipes", (req, res) => {
  RecipeModel.find()
    .then((recipes) => {
      return res.json(recipes);
    })
    .catch((err) => {
      return res.json(err);
    });
});

router.get("/recipe-by-id/:id", (req, res) => {
  const id = req.params.id;
  RecipeModel.findById({ _id: id })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.json(err);
    });
});

router.get("/saved-recipes/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((result) => {
      // console.log(result);
      return res.json(result.savedRecipes); // Return the saved recipes
    })
    .catch((err) => {
      return res.status(500).json(err); // Return a 500 error if user is empty
    });
});

router.get("/user-recipes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById({ _id: id });
    const recipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes }, // Find recipes that are in the savedRecipes array
    });
    // console.log(recipes);
    res.status(201).json(recipes); // Return the recipes
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  const recipe = await RecipeModel.findById({ _id: req.body.recipeId });
  const user = await UserModel.findById({ _id: req.body.userId });
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    return res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    return res.json(err);
  }
});

router.put("/unsave-recipe", async (req, res) => {
  const { recipeId, userId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the recipe from the user's savedRecipes
    user.savedRecipes = user.savedRecipes.filter(
      (savedRecipeId) => savedRecipeId.toString() !== recipeId
    );
    await user.save();

    return res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to unsave recipe" });
  }
});

// Delete a recipe by ID
router.delete("/delete-recipe/:id", async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.body.userId; // User attempting to delete the recipe

  try {
    // Find the recipe
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Check if the user owns the recipe
    if (recipe.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this recipe" });
    }

    // Delete the recipe
    await RecipeModel.findByIdAndDelete(recipeId);

    // Remove the recipe from all users' saved recipes
    await UserModel.updateMany(
      { savedRecipes: recipeId },
      { $pull: { savedRecipes: recipeId } }
    );

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});

// Edit a recipe by ID
router.put("/edit-recipe/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, ingredients, imageUrl, userId } = req.body;

  try {
    // Find the recipe
    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Verify the user owns the recipe
    if (recipe.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to edit this recipe" });
    }

    // Update the recipe
    recipe.name = name || recipe.name;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.imageUrl = imageUrl || recipe.imageUrl;

    await recipe.save();
    res.status(200).json({ message: "Recipe updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update recipe" });
  }
});

module.exports = router;
