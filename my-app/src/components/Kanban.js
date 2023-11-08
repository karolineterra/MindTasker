import React from "react";
import "../styles/kanban.css";

function KanbanBoard() {
  return (
    <div className="kanbanContainer">
      <div className="kanbanBoard">
        <h1>To-Do</h1>
        <div className="kanbanBoardContainer">
          
        </div>
      </div>
      <div className="kanbanBoard">
        <h1>In Progress</h1>
        <div className="kanbanBoardContainer">
          
        </div>
      </div>
      <div className="kanbanBoard">
        <h1>Done</h1>
        <div className="kanbanBoardContainer">

        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
