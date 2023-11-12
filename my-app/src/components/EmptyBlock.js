import React, { useState } from "react";
import KanbanBoard from "./Kanban";
import Pomodoro from "./Pomodoro";
import TodoList from "./Todo";
import Note from "./Note";
import "../styles/EmptyBlock.css";
import kanbanPreview from '../assets/kanbanPreview.png';
import notePreview from '../assets/notePreview.png';
import pomPreview from '../assets/pomPreview.png';
import todoPreview from '../assets/todoPreview.png';

function EmptyBlock({ onTemplateSelect }) {
    const [showModal, setShowModal] = useState(false);
    const selectTemplate = (templateComponent) => {
        onTemplateSelect(templateComponent);
        setShowModal(false);
      };
  return (
    <div className="emptyBlock">
        <div><h3>Add a template here</h3></div>
        <div><button id="addT" onClick={() => {
              setShowModal(true);
            }}>+</button></div>
        {showModal && (
        <div className="addTemplateModal" onClick={() => {
            setShowModal(false);
          }}>
          <div className="addTemplateModalContent"  onClick={(e) => e.stopPropagation()}>
            <button data-label="Kanban" onClick={() => selectTemplate(KanbanBoard)}><img src={kanbanPreview}></img></button>
            <button data-label="Pomodoro" onClick={() => selectTemplate(Pomodoro)}><img src={pomPreview}></img></button>
            <button data-label="To-Do List" onClick={() => selectTemplate(TodoList)}><img src={todoPreview}></img></button>
            <button data-label="Note" onClick={() => selectTemplate(Note)}><img src={notePreview}></img></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmptyBlock;
