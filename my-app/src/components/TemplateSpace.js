import React from "react";
import TemplateBlock from "./TemplateBlock";
import '../styles/TemplatesSpace.css';

function TemplateSpace(){
    return (
        <div className="templatesContainer">
            <TemplateBlock/>
            <TemplateBlock/>
            <TemplateBlock/>
            <TemplateBlock/>
        </div>
        
    )
}

export default TemplateSpace;