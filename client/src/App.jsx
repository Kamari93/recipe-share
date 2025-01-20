import { useState } from "react";
import Regisration from "./Components/Registration";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import SavedRecipe from "./Components/SavedRecipe";
import CreateRecipe from "./Components/CreateRecipe";
import ReadRecipe from "./Components/ReadRecipe";
import EditRecipe from "./Components/EditRecipe";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Regisration />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/recipe/create-recipe" element={<CreateRecipe />} />
        <Route path="/recipe/saved-recipe" element={<SavedRecipe />} />
        <Route path="/read-recipe/:id" element={<ReadRecipe />} />
        <Route path="/recipe/edit-recipe/:id" element={<EditRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
