import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

   //Use Navigate hook is used to route to a specified component:
   const navigate = useNavigate();

   const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
 
   // Verifying Login functionality using Backend server with credentials:
   const handleSubmit = async (e) => {
     e.preventDefault();
     const response = await fetch("http://localhost:2000/api/user/createUser", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
       }),
     });
 
     const json = await response.json();
     console.log(json);
 
     if (json.success) {
       //redirect to Home page:
       localStorage.setItem("token", json.authToken);
       props.showAlert("User successfully registered with Dnevnik", "success");
       navigate("/login");
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
      <h2>Create an account with Dnevnik</h2>
      </div>
      <div className="my-3">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          aria-describedby="emailHelp"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          onChange={handleChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="cpassword"
          name="cpassword"
          onChange={handleChange}
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Signup;
