import { react, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://recipe-share-server-brown.vercel.app/auth/login", {
        username,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
        window.localStorage.setItem("id", result.data.id); // Store the user ID in local storage
        window.localStorage.setItem("username", result.data.username); // Store the username in local storage
      })
      .catch((err) => console.log(err));
  };
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
