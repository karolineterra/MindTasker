import React from "react";
import userImage from '../assets/user-default.png';
import addSpaceImage from '../assets/add.png';
import logoutImage from '../assets/logout.png';
import '../styles/Sidebar.css';
function Sidebar() {
    return (
        <div className="sidebar">
            <h1 className="logotype">MindTasker</h1>
            <img src={userImage}></img>
            
            <div className="userSpaces">
                <h2>My spaces</h2>
                <ul>
                    <li className="selectedSpace"><a>space name</a></li>
                    <li><a>space name</a></li>
                </ul>
                <button className="addSpaceButton"><img src={addSpaceImage}></img>Add space</button>
            </div>

            <button className="logoutButton"><img src={logoutImage}></img>Log out</button>

        </div>
    );
}

export default Sidebar;