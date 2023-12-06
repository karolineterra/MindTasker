import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TemplateSpace from "../components/TemplateSpace";
import "../styles/HomePage.css";

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
        <p>Select a template</p>
      )}
    </div>
  );
}

export default HomePage;
