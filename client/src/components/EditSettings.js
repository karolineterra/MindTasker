import React, { useState, useEffect } from "react";
import axios from "axios";
import userImage from "../assets/userImage.png";
import "../styles/EditSettings.css";

function EditSettings() {
  const [editedData, setEditedData] = useState({
    nome: "",
    email: "",
    nascimento: "",
    genero: "",
    foto: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const updateResponse = await axios.post(
        "/api/updateProfile",
        editedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(updateResponse.data.message);

      if (updateResponse.data.message === "Profile updated successfully!") {
        window.location.href = "/settings";
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prevData) => ({
          ...prevData,
          foto: reader.result,
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setEditedData((prevData) => ({
        ...prevData,
        foto: null,
      }));
      setImagePreview(null);
    }
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="editSettingsBody">
      <h1>Edit Profile</h1>
      <div className="informationPanel">
        <div className="imageContainer">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageChange(e)}
          />
          <div
            style={{
              backgroundImage: `url(${editedData.foto || userImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="profilePictureContainer"
          ></div>

          <button className="editPictureSettings" onClick={handleEditPicture}>
            Edit Picture
          </button>
        </div>

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
            <label htmlFor="genero">Gender</label>
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
    </div>
  );
}

export default EditSettings;
