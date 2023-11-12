import React, { useState } from "react";
import "../styles/kanban.css";
import addImage from "../assets/icon-add-grey.png";

function KanbanBoard() {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  const addTask = () => {
    if (taskTitle.trim() !== "") {
      switch (selectedColumn) {
        case "todo":
          setToDoTasks([
            ...toDoTasks,
            { id: toDoTasks.length + 1, title: taskTitle },
          ]);
          break;
        case "inProgress":
          setInProgressTasks([
            ...inProgressTasks,
            { id: inProgressTasks.length + 1, title: taskTitle },
          ]);
          break;
        case "done":
          setDoneTasks([
            ...doneTasks,
            { id: doneTasks.length + 1, title: taskTitle },
          ]);
          break;
        default:
          break;
      }

      setTaskTitle("");
      setShowModal(false);
    }
  };

  const deleteTask = (taskId, column) => {
    let updatedTasks = [];
    switch (column) {
      case "todo":
        updatedTasks = toDoTasks.filter((task) => task.id !== taskId);
        setToDoTasks(updatedTasks);
        break;
      case "inProgress":
        updatedTasks = inProgressTasks.filter((task) => task.id !== taskId);
        setInProgressTasks(updatedTasks);
        break;
      case "done":
        updatedTasks = doneTasks.filter((task) => task.id !== taskId);
        setDoneTasks(updatedTasks);
        break;
      default:
        break;
    }
  };

  const editTask = (taskId, newTitle, column) => {
    let updatedTasks = [];
    switch (column) {
      case "todo":
        updatedTasks = toDoTasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        );
        setToDoTasks(updatedTasks);
        break;
      case "inProgress":
        updatedTasks = inProgressTasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        );
        setInProgressTasks(updatedTasks);
        break;
      case "done":
        updatedTasks = doneTasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        );
        setDoneTasks(updatedTasks);
        break;
      default:
        break;
    }
  };

  return (
    <div className="kanbanContainer">
      <div className="kanbanBoard">
        <h1>To-Do</h1>
        <div className="kanbanBoardContainer">
          <button
            className="kanbanAddTask"
            onClick={() => {
              setShowModal(true);
              setSelectedColumn("todo");
            }}
          >
            Add Task <img src={addImage} alt="Add Icon" />
          </button>
          {toDoTasks.map((task) => (
            <div key={task.id} className="kanbanTask">
              <p>{task.title}</p>
              <button onClick={() => deleteTask(task.id, "todo")}>
                Delete
              </button>
              <button
                onClick={() => {
                  const newTitle = prompt("Enter new title: ", task.title);
                  if (newTitle !== null) {
                    editTask(task.id, newTitle, "todo");
                  }
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* In Progress */}
      <div className="kanbanBoard">
        <h1>In Progress</h1>
        <div className="kanbanBoardContainer">
          <button
            className="kanbanAddTask"
            onClick={() => {
              setShowModal(true);
              setSelectedColumn("inProgress");
            }}
          >
            Add Task <img src={addImage} alt="Add Icon" />
          </button>
          {inProgressTasks.map((task) => (
            <div key={task.id} className="kanbanTask">
              <p>{task.title}</p>
              <button onClick={() => deleteTask(task.id, "inProgress")}>
                Delete
              </button>
              <button
                onClick={() => {
                  const newTitle = prompt("Enter new title: ", task.title);
                  if (newTitle !== null) {
                    editTask(task.id, newTitle, "inProgress");
                  }
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Done */}
      <div className="kanbanBoard">
        <h1>Done</h1>
        <div className="kanbanBoardContainer">
          <button
            className="kanbanAddTask"
            onClick={() => {
              setShowModal(true);
              setSelectedColumn("done");
            }}
          >
            Add Task <img src={addImage} alt="Add Icon" />
          </button>
          {doneTasks.map((task) => (
            <div key={task.id} className="kanbanTask">
              <p>{task.title}</p>
              <button onClick={() => deleteTask(task.id, "done")}>
                Delete
              </button>
              <button
                onClick={() => {
                  const newTitle = prompt("Enter new title: ", task.title);
                  if (newTitle !== null) {
                    editTask(task.id, newTitle, "done");
                  }
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding tasks */}
      {showModal && (
        <div className="kanbanModal">
          <div className="kanbanModalContent">
            <span className="kanbanClose" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Add Task</h2>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
            />
            <button onClick={addTask}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default KanbanBoard;
