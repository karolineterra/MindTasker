import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TemplateSpace from "../components/TemplateSpace";
import "../styles/HomePage.css";
import imagemSelecionar from "../assets/fique-em-casa.png";

function HomePage() {
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);

  const handleSpaceSelection = (spaceId) => {
    setSelectedSpaceId(spaceId);
  };

  return (
    <div className="homePageBody">
      <Sidebar onSpaceSelect={handleSpaceSelection} />
      {selectedSpaceId ? (
        <TemplateSpace spaceId={selectedSpaceId} />
      ) : (
        <div className="selectWorkspaceContainer">
          <h1 className="selectWorkspaceText">Create or select a workspace</h1>
          <img className="selectWorkspaceImage" src={imagemSelecionar}></img>
        </div>
      )}
    </div>
  );
}

export default HomePage;
