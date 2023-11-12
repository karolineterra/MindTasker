import React from "react";
import TemplateBlock from "./TemplateBlock";
import '../styles/TemplatesSpace.css';
import KanbanBoard from "./Kanban";
import Pomodoro from "./Pomodoro";
import Note from "./Note";

function TemplateSpace(){
    return (
        <div className="templatesContainer">
            <TemplateBlock Component={KanbanBoard}/>
            <TemplateBlock Component={Pomodoro}/>
            <TemplateBlock Component={KanbanBoard}/>
            <TemplateBlock Component={Note}/>
        </div>
        
    )
}

export default TemplateSpace;