
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const LoginCustomCSS = () => {

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
    if (json.success) {

      //redirect to Home page:
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      alert("Please enter valid credentials");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="wrapper">
        <header>Login Form</header>
        <form onSubmit={handleSubmit}>
          <div className="field email">
            <div className="input-area">
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Email Address"
                autoComplete="email"
              />
              <i className="icon fas fa-envelope"></i>
              <i className="error error-icon fas fa-exclamation-circle"></i>
            </div>
            <div className="error error-txt">Email can't be blank</div>
          </div>
          <div className="field password">
            <div className="input-area">
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
              <i className="icon fas fa-lock"></i>
              <i className="error error-icon fas fa-exclamation-circle"></i>
            </div>
            <div className="error error-txt">Password can't be blank</div>
          </div>
          <div className="pass-txt">
            <Link>Forgot password?</Link>
          </div>
          {/* <input type="submit" value="Login" /> */}
          <button
            type="submit"
            className="btn btn-success mx-1"
          >
            Login
          </button>
        </form>
        <div className="sign-txt">
          Not yet member? <Link>Signup now</Link>
        </div>
      </div>
    </>
  );
};

export default LoginCustomCSS;
