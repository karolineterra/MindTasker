import React, { useState, useEffect } from "react";
import userImage from "../assets/userImage.png";
import InformationComponent from "../components/InformationComponent";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/Settings.css";

function Settings() {
  const [userData, setUserData] = useState({});

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
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const [image, setImage] = useState(userImage);
  const fileInputRef = React.createRef();

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profileInformation">
      <h1>Profile</h1>
      <div className="informationPanel">
        <div
          style={{
            backgroundImage: `url(${image || userData.foto})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="profilePictureContainer"
        ></div>
        <div>
        {userData && (
          <>
            <InformationComponent label="Name" value={userData.nome} />
            <InformationComponent label="Email" value={userData.email} />
            <InformationComponent label="Birth" value={new Date(userData.nascimento).toLocaleDateString()} />
            <InformationComponent label="Gender" value={userData.genero} />
          </>
        )}
        </div>
      </div>
      <div className="buttonsContainer">
        <button className="editPictureSettings" onClick={triggerFileInput}>
          Edit Picture
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <Link className="editProfileSettings" to="/editsettings">
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default Settings;