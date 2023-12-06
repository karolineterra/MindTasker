import React, { useState } from "react";
import BesideForm from "../components/BesideForm";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function CreateAccount() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birth: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/createAccount", formData)
      .then((response) => {
        console.log(response.data.message);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error creating account:", error);
      });
  };

  return (
    <div className="LoginBody">
      <BesideForm />
      <form onSubmit={handleSubmit}>
        <h1>Create Your Account</h1>
        <span className="inputSpan">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </span>

        <span className="inputSpan">
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </span>

        <span className="inputSpan">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </span>

        <span className="inputSpan">
          <label htmlFor="birth">Birth</label>
          <input
            name="birth"
            type="date"
            value={formData.birth}
            onChange={handleChange}
          />
        </span>

        <span className="inputSpan">
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </span>

        <span className="submitSpan">
          <input type="submit" value="Confirm" />
          <Link to="/login">Already have an account? Click here!</Link>
        </span>
      </form>
    </div>
  );
}

export default CreateAccount;
