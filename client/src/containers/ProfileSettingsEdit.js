import React from "react";
import Sidebar from "../components/Sidebar";
import EditSettings from "../components/EditSettings";
import '../styles/ProfileSettingsEdit.css';

function ProfileSettingsEdit() {
    return (
        <div className="profileSettingsEditBody">
            <Sidebar/>
            <EditSettings/>
        </div>
    );
}

export default ProfileSettingsEdit;