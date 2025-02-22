import { react, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://recipe-share-server-brown.vercel.app/auth/register", {
        username,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/auth/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 border border-1 w-25">
        <h3>Register</h3>
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
          <button className="btn btn-success w-100">Submit</button>
          <Link to="/auth/login">
            <button className="btn btn-default w-100 mt-2 border">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
