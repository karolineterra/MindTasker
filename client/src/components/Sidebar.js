import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import userImage from "../assets/user-default.png";
import addSpaceImage from "../assets/add.png";
import logoutImage from "../assets/logout.png";
import closeIcon from "../assets/closeIcon.png";
import editIcon from "../assets/editIcon.png";
import informationIcon from "../assets/infoCircle.png";
import menuIcon from "../assets/menu-hamburguer.png";
import axios from "axios";
import "../styles/Sidebar.css";

function Sidebar({ onSpaceSelect }) {
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "username",
    image: userImage,
  });
  const [workspaces, setWorkspaces] = useState([]);
  const [newSpaceName, setNewSpaceName] = useState("");
  const [isAddingSpace, setIsAddingSpace] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#3D4E78");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleColorModal = () => {
    setIsColorModalOpen(!isColorModalOpen);
  };

  const handleSpaceSelection = (spaceId) => {
    setSelectedSpaceId(spaceId);
    if (onSpaceSelect) {
      onSpaceSelect(spaceId);
    }
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

      axios
        .get("http://localhost:3001/api/workspaces", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setWorkspaces(response.data);
        })
        .catch((error) => {
          console.error("Error fetching workspaces:", error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    setNewSpaceName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addWorkspace();
    } else if (e.key === "Escape") {
      setIsAddingSpace(false);
      setNewSpaceName("");
    }
  };

  const addWorkspace = () => {
    const token = localStorage.getItem("token");

    if (token && newSpaceName) {
      axios
        .post(
          "/api/addWorkspace",
          { nome: newSpaceName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          axios
            .get("/api/workspaces", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setWorkspaces(response.data);
              setIsAddingSpace(false);
              setNewSpaceName("");
            })
            .catch((error) => {
              console.error("Error fetching workspaces:", error);
            });
        })
        .catch((error) => {
          console.error("Error adding workspace:", error);
        });
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  useEffect(() => {
    document.documentElement.style.setProperty('--maincolor', selectedColor);
  }, [selectedColor]);
  
  const saveColor = () => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          "/api/changecolor",
          { color: selectedColor },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          toggleColorModal();
        })
        .catch((error) => {
          console.error("Error changing color:", error);
        });
    }
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
            <img src={userData.image} className="userImage" alt="User"></img>
            <h3 className="userName">{userData.name}</h3>
            <Link className="editProfile" to="/settings">
              Edit profile <img src={editIcon} alt="Edit"></img>
            </Link>
            <button className="changeColor" onClick={toggleColorModal}>
              Change color<img src={editIcon} alt="Edit"></img>
            </button>
            <div></div>
          </div>

          <div className="userSpaces">
            <h2>My spaces</h2>
            <ul>
              {workspaces.map((workspace) => (
                <li key={workspace.id}>
                  <button
                    className=""
                    onClick={() => handleSpaceSelection(workspace.id)}
                  >
                    {workspace.nome}
                  </button>
                </li>
              ))}
            </ul>
            {!isAddingSpace ? (
              <button
                className="addSpaceButton"
                onClick={() => setIsAddingSpace(true)}
              >
                <img src={addSpaceImage} alt="Add Space" />
                Add space
              </button>
            ) : (
              <input
                type="text"
                placeholder="Enter space name"
                value={newSpaceName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            )}
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

      <Modal
        isOpen={isColorModalOpen}
        onRequestClose={toggleColorModal}
        className="color-modal"
      >
        <h2>Change Color</h2>
        <div className="color-options">
          <button
            style={{ backgroundColor: "#3D4E78" }}
            onClick={() => handleColorChange("#3D4E78")}
            className={selectedColor === "#3D4E78" ? "selected" : ""}
          ></button>
          <button
            style={{ backgroundColor: "#AA90D4" }}
            onClick={() => handleColorChange("#AA90D4")}
            className={selectedColor === "#AA90D4" ? "selected" : ""}
          ></button>
          <button
            style={{ backgroundColor: "#DAC064" }}
            onClick={() => handleColorChange("#DAC064")}
            className={selectedColor === "#DAC064" ? "selected" : ""}
          ></button>
          <button
            style={{ backgroundColor: "#1F1E1E" }}
            onClick={() => handleColorChange("#1F1E1E")}
            className={selectedColor === "#1F1E1E" ? "selected" : ""}
          ></button>
          <button
            style={{ backgroundColor: "#E16A6A" }}
            onClick={() => handleColorChange("#E16A6A")}
            className={selectedColor === "#E16A6A" ? "selected" : ""}
          ></button>
          <button
            style={{ backgroundColor: "#5CB083" }}
            onClick={() => handleColorChange("#5CB083")}
            className={selectedColor === "#5CB083" ? "selected" : ""}
          ></button>
        </div>
        <button onClick={saveColor}>Save</button>
      </Modal>
    </nav>
  );
}

export default Sidebar;