import React from "react";
import userImage from '../assets/user-default.png';
import addSpaceImage from '../assets/add.png';
import logoutImage from '../assets/logout.png';
import '../styles/Sidebar.css';

import closeIcon from '../assets/closeIcon.png';
import editIcon from '../assets/editIcon.png';
import informationIcon from '../assets/infoCircle.png';

function Sidebar() {
    return (
        <nav className="sidebar">
            <button className="closeIcon"><img src={closeIcon}></img></button>
            
            <h1 className="logotype">MindTasker</h1>
            
            <div className="userInformation">
                <img src={userImage} className="userImage"></img>
                <h3 className="userName">username</h3>
                <a className="editProfile" href="/settings">Edit profile <img src={editIcon}></img></a>
                
            </div>
            
            <div className="userSpaces">
                <h2>My spaces</h2>
                <ul>
                    <li><a href="/homepage" className="selectedSpace">space name</a></li>
                    <li><a href="">space name</a></li>
                    <li><a href="">space name</a></li>
                    <li><a href="">space name</a></li>
                </ul>
                <button className="addSpaceButton"><img src={addSpaceImage}></img>Add space</button>
            </div>

            <footer>
                <a href=""><img src={informationIcon}></img></a>

                <a href="/login" className="logoutButton"><img src={logoutImage}></img>Log out</a>
            </footer>
            

        </nav>
    );
}

export default Sidebar;