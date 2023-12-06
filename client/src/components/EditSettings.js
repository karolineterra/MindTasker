import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/EditSettings.css";

function EditSettings() {
  const [editedData, setEditedData] = useState({
    nome: "",
    email: "",
    nascimento: "",
    genero: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setEditedData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    axios
      .post("/api/updateProfile", editedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message === "Profile updated successfully!") {
          window.location.href = "/settings"; 
        } else {
          console.error("Error updating profile");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log("Edited Data:", editedData);

  return (
    <div className="editSettingsBody">
      <h1>Edit Profile</h1>
      
      <form onSubmit={handleSubmit}>
        <span className="editSettingsInputSpan">
          <label htmlFor="name">Name</label>
          <input
            name="nome"
            type="text"
            placeholder="Enter your name"
            value={editedData.nome}
            onChange={handleChange}
          ></input>
        </span>
        <span className="editSettingsInputSpan">
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={editedData.email}
            onChange={handleChange}
          ></input>
        </span>
        <span className="editSettingsInputSpan">
        <label htmlFor="nascimento">Birth</label>
        <input
          name="nascimento"
          type="date"
          value={editedData.nascimento}
          onChange={handleChange}
        ></input>
      </span>
        <span className="editSettingsInputSpan">
          <label htmlFor="gender">Gender</label>
          <select
            name="genero"
            value={editedData.genero}
            onChange={handleChange}
            className="editSettingsSelect"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </span>

        <span className="editSettingsSubmitSpan">
          <input type="submit" value="Save Changes" />
        </span>
      </form>
    </div>
  );
}

export default EditSettings;