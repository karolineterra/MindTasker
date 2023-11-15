import React from "react";
import "../styles/TemplateBlock.css";

const TemplateBlock = ({ Component, onTemplateSelect }) => (
  <div className="templateContainer">
    <Component onTemplateSelect={onTemplateSelect} />
  </div>
);


export default TemplateBlock;
