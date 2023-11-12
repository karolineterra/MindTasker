import React, { useState } from "react";
import userImage from "../assets/user-default.png";
import addSpaceImage from "../assets/add.png";
import logoutImage from "../assets/logout.png";
import "../styles/Sidebar.css";

import closeIcon from "../assets/closeIcon.png";
import editIcon from "../assets/editIcon.png";
import informationIcon from "../assets/infoCircle.png";
import menuIcon from "../assets/menu-hamburguer.png";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`sidebar ${isMenuOpen ? "menu-open" : ""}`}>
      <button
        className={`closeIcon ${isMenuOpen ? "menuIcon" : "closeIcon"}`}
        onClick={toggleMenu}
      >
        <img src={isMenuOpen ? menuIcon : closeIcon} alt="Menu Icon"></img>
      </button>

      {!isMenuOpen && (
        <>
          <h1 className="logotype">MindTasker</h1>

          <div className="userInformation">
            <img src={userImage} className="userImage"></img>
            <h3 className="userName">username</h3>
            <a className="editProfile" href="/settings">
              Edit profile <img src={editIcon}></img>
            </a>
          </div>

          <div className="userSpaces">
            <h2>My spaces</h2>
            <ul>
              <li>
                <a href="/homepage" className="selectedSpace">
                  space name
                </a>
              </li>
              <li>
                <a href="">space name</a>
              </li>
              <li>
                <a href="">space name</a>
              </li>
              <li>
                <a href="">space name</a>
              </li>
            </ul>
            <button className="addSpaceButton">
              <img src={addSpaceImage}></img>Add space
            </button>
          </div>

          <footer>
            <a href="">
              <img src={informationIcon}></img>
            </a>

            <a href="/login" className="logoutButton">
              <img src={logoutImage}></img>Log out
            </a>
          </footer>
        </>
      )}
      {isMenuOpen && <div className="menu-hamburguer-content"></div>}
    </nav>
  );
}

export default Sidebar;
