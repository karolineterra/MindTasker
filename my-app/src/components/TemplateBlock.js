import React from "react";
import "../styles/TemplateBlock.css";

const TemplateBlock = ({ Component }) => (
  <div className="templateContainer">
    <Component />
  </div>
);

export default TemplateBlock;
