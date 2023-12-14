import React, { useState } from "react";
import BesideForm from "../components/BesideForm";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/login", formData)
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message === "Login successful") {
          localStorage.setItem("token", response.data.token);
          window.location.href = "/homepage";
        } else {
          setShowWarning(true)
          console.error("Invalid credentials");
        }
      })
      .catch((error) => {
        setShowWarning(true)
        console.error("Error logging in:", error);
      });
  };

  return (
    <div className="LoginBody">
      <BesideForm />
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <span className="inputSpan">
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          ></input>
        </span>
        <span className="inputSpan">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          ></input>
          <Link to="">I forgot my password</Link>
        </span>
        {showWarning&&(
        <span className="warning">Wrong password or email!</span>
          )}
        <span className="submitSpan">
          <input type="submit" value="Log In" />
          <Link to="/createaccount">Don't have an account? Click here!</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
