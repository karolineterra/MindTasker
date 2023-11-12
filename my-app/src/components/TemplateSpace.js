import React from "react";
import TemplateBlock from "./TemplateBlock";
import "../styles/TemplatesSpace.css";
import KanbanBoard from "./Kanban";
import Pomodoro from "./Pomodoro";
import Note from "./Note";
import TodoList from "./Todo";

function TemplateSpace() {
  return (
    <div className="templatesContainer">
      <TemplateBlock Component={KanbanBoard} />
      <TemplateBlock Component={Pomodoro} />
      <TemplateBlock Component={KanbanBoard} />
      <TemplateBlock Component={TodoList} />
    </div>
  );
}

export default TemplateSpace;
