import React from "react";
import userImage from "../assets/userImage.png"
import InformationComponent from "../components/InformationComponent";

import '../styles/Settings.css';


function Settings() {
    return (
        <div className="profileInformation">
            <h1>Profile</h1>
            <div className="informationPanel">
                <img src={userImage}></img>
                <div>
                <InformationComponent label="Name" value="username" />
                <InformationComponent label="Email" value="email@gmail.com" />
                <InformationComponent label="Age" value="20 years" />
                <InformationComponent label="Gender" value="Male" />
                </div>
            </div>
            <div className="buttonsContainer">
                <button className="editPictureSettings">Edit Picture</button>
                <a className="editProfileSettings" href="/settings">Edit Profile</a>
            </div>
        </div>
    );
}

export default Settings;