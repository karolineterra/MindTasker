import React from "react";
import TemplateBlock from "./TemplateBlock";
import '../styles/TemplatesSpace.css';
import KanbanBoard from "./Kanban";

function TemplateSpace(){
    return (
        <div className="templatesContainer">
            <TemplateBlock Component={KanbanBoard}/>
        </div>
        
    )
}

export default TemplateSpace;