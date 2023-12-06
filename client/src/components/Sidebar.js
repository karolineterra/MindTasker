import React, { useState, useEffect } from "react";
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

function Sidebar({ onSpaceSelect }) {
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);

  const handleSpaceSelection = (spaceId) => {
    setSelectedSpaceId(spaceId);
    if(onSpaceSelect) {
      onSpaceSelect(spaceId);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "username",
    image: userImage,
  });
  const [workspaces, setWorkspaces] = useState([]);
  const [newSpaceName, setNewSpaceName] = useState("");
  const [isAddingSpace, setIsAddingSpace] = useState(false);

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
          // Atualiza a lista de workspaces após adicionar um novo
          axios
            .get("/api/workspaces", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setWorkspaces(response.data);
              setIsAddingSpace(false); // Fecha o input após adicionar o espaço
              setNewSpaceName(""); // Limpa o nome do novo espaço
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

  const handleInputChange = (e) => {
    setNewSpaceName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addWorkspace();
    } else if (e.key === "Escape") {
      // Fecha o input se a tecla Esc for pressionada
      setIsAddingSpace(false);
      setNewSpaceName("");
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
    </nav>
  );
}

export default Sidebar;
