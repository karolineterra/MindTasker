import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import userImage from "../assets/user-default.png";
import addSpaceImage from "../assets/add.png";
import logoutImage from "../assets/logout.png";
import "../styles/Sidebar.css";

import closeIcon from "../assets/closeIcon.png";
import editIcon from "../assets/editIcon.png";
import informationIcon from "../assets/infoCircle.png";
import menuIcon from "../assets/menu-hamburguer.png";
import axios from "axios";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "username",
    image: userImage,
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
          const { nome, foto } = response.data;
          setUserData({ name: nome, image: foto || userImage });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

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
            <img src={userData.image} className="userImage" alt="User"></img>
            <h3 className="userName">{userData.name}</h3>
            <Link className="editProfile" to="/settings">
              Edit profile <img src={editIcon} alt="Edit"></img>
            </Link>
            <div>
            </div>
          </div>

          <div className="userSpaces">
            <h2>My spaces</h2>
            <ul>
              <li>
                <Link to="/homepage" className="selectedSpace">
                  space name
                </Link>
              </li>
              <li>
                <Link to="">space name</Link>
              </li>
              <li>
                <Link to="">space name</Link>
              </li>
              <li>
                <Link to="">space name</Link>
              </li>
            </ul>
            <button className="addSpaceButton">
              <img src={addSpaceImage} alt="Add Space"></img>Add space
            </button>
          </div>

          <footer>
            <Link to="">
              <img src={informationIcon} alt="Information"></img>
            </Link>

            <Link to="/login" className="logoutButton">
              <img src={logoutImage} alt="Logout"></img>Log out
            </Link>
          </footer>
        </>
      )}
      {isMenuOpen && <div className="menu-hamburguer-content"></div>}
    </nav>
  );
}

export default Sidebar;