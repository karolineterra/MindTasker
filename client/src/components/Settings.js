import React, { useState, useEffect } from "react";
import InformationComponent from "../components/InformationComponent";
import userImage from "../assets/userImage.png";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/Settings.css";

function Settings() {
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);

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

  return (
    <div className="profileInformation">
      <h1>Profile</h1>
      <div className="informationPanel">
      <div
          style={{
            backgroundImage: `url(${userData.foto || userImage})`,
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
              <InformationComponent
                label="Birth"
                value={new Date(userData.nascimento).toLocaleDateString()}
              />
              <InformationComponent label="Gender" value={userData.genero} />
            </>
          )}
        </div>
      </div>
      <div className="buttonsContainer">
        {!editing && (
          <Link className="editProfileSettings" to="/editsettings">
            Edit Profile
          </Link>
        )}
      </div>
    </div>
  );
}

export default Settings;