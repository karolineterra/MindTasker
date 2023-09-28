import React from "react";
import '../styles/BesideForm.css';
import formImage from '../assets/formImg.png';

function BesideForm(){
    return (
        <div className="besideForm">
            <h1 className="logotypeBesideForm"> MindTasker </h1>
            <h2>Flexibility at its best organize all your projects in one space!</h2>
            <p>Our app offers features such as Pomodoro Clock, 
                To-Do List, Kanban, notes, and customization of
                colors and object position on the workspace, 
                allowing you to organize your projects in a flexible
                and efficient way. Try it now and transform your
                way of working!</p>
            <img src={formImage}></img>
        </div>
    )
}

export default BesideForm;