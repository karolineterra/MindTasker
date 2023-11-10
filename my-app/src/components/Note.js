import React, { useState } from 'react';
import editIcon from '../assets/editIcon.png';
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
            <h3 className='noteTitle'>Note Title</h3>
            <button onClick={toggleEdit}>{isEdit ? 'Save' : <img src={editIcon} alt="Edit Icon" />}</button>
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
