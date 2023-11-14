import React, { useState } from 'react';
import editIcon from '../assets/editIcon.png';
import Save from '../assets/Save.png';
import "../styles/Note.css";

function Note() {
    const [note, setNote] = useState({
        title: 'Note Title',
        content: 'Note Content',
    });
    
    const [isEdit, setIsEdit] = useState(false);
    
    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };
  return (
    <div className="noteContainer">
        <div className="noteHeader">
            <h3 className={`noteTitle ${isEdit ? 'editMode' : ''}`}>
                {isEdit ? (<textarea value={note.title} onChange={ (event) => {
                const newTitle = event.target.value;
                const updatedNote = { ...note, title: newTitle };
                setNote(updatedNote);
            }}/>) : (note.title )}</h3>
            <button onClick={toggleEdit}>{isEdit ? <img src={Save} alt="Save Icon" /> : <img src={editIcon} alt="Edit Icon" />}</button>
        </div>
        <div className={`noteText ${isEdit ? 'editMode' : ''}`}>
            {isEdit ? (<textarea value={note.content} onChange={ (event) => {
                const newContent = event.target.value;
                const updatedNote = { ...note, content: newContent };
                setNote(updatedNote);
            }}/>) : (note.content )}
        </div>
    </div>
  );
}

export default Note;
