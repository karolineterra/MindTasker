import React from "react";
import Sidebar from "../components/Sidebar";
import Settings from "../components/Settings";
import '../styles/ProfileSettings.css';


function ProfileSettings() {
    return (
        <div className="profileSettingsContainer">
            <Sidebar/>
            <Settings/>
        </div>
    );
}

export default ProfileSettings;