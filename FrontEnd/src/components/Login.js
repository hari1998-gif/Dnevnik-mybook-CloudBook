import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  //Use Navigate hook is used to route to a specified component:
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Verifying Login functionality using Backend server with credentials:
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:2000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    console.log("Provided token:", json.authToken);

    if (json.success) {
      //redirect to Home page:
      localStorage.setItem("token", json.authToken);
      props.showAlert("User Login Successfully and updated the user data", "success")
      navigate("/");

    } else {
      props.showAlert("Please enter valid credentials", "danger")
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container my-2">
      <h2>Login to Dnevnik</h2>
      </div>
      <div className="my-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={handleChange}
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange}
          id="password"
          name="password"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Login;
