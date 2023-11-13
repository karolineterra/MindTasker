import React, { useState } from "react";
import userImage from "../assets/userImage.png";
import InformationComponent from "../components/InformationComponent";
import { Link } from "react-router-dom";

import "../styles/Settings.css";

function Settings() {
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
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          class="profilePictureContainer"
        ></div>
        <div>
          <InformationComponent label="Name" value="username" />
          <InformationComponent label="Email" value="email@gmail.com" />
          <InformationComponent label="Age" value="20 years" />
          <InformationComponent label="Gender" value="Male" />
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
