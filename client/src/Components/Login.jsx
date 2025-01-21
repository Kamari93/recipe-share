import { react, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "https://recipe-share-server-brown.vercel.app/auth/login",
        {
          username,
          password,
        }
      );

      // Check the response message and navigate only if login is successful
      if (result.data.message === "Login successful") {
        window.localStorage.setItem("id", result.data.id); // Store user ID
        window.localStorage.setItem("username", result.data.username); // Store username
        navigate("/"); // Navigate to the homepage
      } else {
        setError(result.data.message); // Display error message
        // alert(result.data.message);
        // alert(error);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again."); // Catch unexpected errors
      // alert(error);
    }
  };

  // ensures that alert is shown whenever the error state changes, even if the component is re-rendered
  useEffect(() => {
    if (error) {
      alert(error); // Trigger alert whenever the error state changes
    }
  }, [error]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 border border-1 w-25">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label labelfor="username">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            <label labelfor="Password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className="btn btn-success w-100">Login</button>
          <Link to="/auth/register">
            <button className="btn btn-default w-100 mt-2 border">
              Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
