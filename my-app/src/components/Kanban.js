import React, { useState } from "react";
import "../styles/kanban.css";
import addImage from "../assets/icon-add-grey.png";
import deleteImage from "../assets/excluir.png";
import editImage from "../assets/editar.png";

function KanbanBoard() {
  const customColors = ["#E1F65A", "#F65A5A", "#ACD2F5", "#EBACF5", "#ACF5BC"];

  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingTitleInProgress, setEditingTitleInProgress] = useState("");
  const [editingTitleDone, setEditingTitleDone] = useState("");

  const addTask = () => {
    if (taskTitle.trim() !== "") {
      const newTask = {
        id: toDoTasks.length + 1,
        title: taskTitle,
        color: customColors[Math.floor(Math.random() * customColors.length)],
      };

      switch (selectedColumn) {
        case "todo":
          setToDoTasks([...toDoTasks, newTask]);
          break;
        case "inProgress":
          setInProgressTasks([...inProgressTasks, newTask]);
          break;
        case "done":
          setDoneTasks([...doneTasks, newTask]);
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

  const startEditTask = (taskId, column) => {
    setEditingTask(taskId);
    switch (column) {
      case "inProgress":
        setEditingTitleInProgress(
          inProgressTasks.find((task) => task.id === taskId)?.title || ""
        );
        break;
      case "done":
        setEditingTitleDone(
          doneTasks.find((task) => task.id === taskId)?.title || ""
        );
        break;
      default:
        break;
    }
  };

  const saveEditedTask = (taskId, newTitle, column) => {
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

    setEditingTask(null);
    setEditingTitleInProgress("");
    setEditingTitleDone("");
  };

  return (
    <div className="kanbanContainer">
      {/* ToDo */}
      <div className="kanbanBoard">
        <h1>To-Do</h1>
        <div className="kanbanBoardContainer">
          
          {toDoTasks.map((task) => (
            <div
              key={task.id}
              className="kanbanTask"
              style={{ backgroundColor: task.color }}
            >
              {editingTask === task.id ? (
                <div className="editable-task">
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                  <button
                    onClick={() => saveEditedTask(task.id, taskTitle, "todo")}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p>{task.title}</p>
                  <div className="kanbanTaskButtons">
                    <button onClick={() => deleteTask(task.id, "todo")}>
                      <img src={deleteImage} alt="Delete Icon" />
                    </button>
                    <button onClick={() => startEditTask(task.id, "todo")}>
                      <img src={editImage} alt="Edit Icon" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          <button
            className="kanbanAddTask"
            onClick={() => {
              setShowModal(true);
              setSelectedColumn("todo");
            }}
          >
            Add Task <img src={addImage} alt="Add Icon" />
          </button>
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
            <div
              key={task.id}
              className="kanbanTask"
              style={{ backgroundColor: task.color }}
            >
              {editingTask === task.id ? (
                <div className="editable-task">
                  <input
                    type="text"
                    value={editingTitleInProgress}
                    onChange={(e) => setEditingTitleInProgress(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      saveEditedTask(
                        task.id,
                        editingTitleInProgress,
                        "inProgress"
                      )
                    }
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p>{task.title}</p>
                  <div className="kanbanTaskButtons">
                    <button onClick={() => deleteTask(task.id, "inProgress")}>
                      <img src={deleteImage} alt="Delete Icon" />
                    </button>
                    <button
                      onClick={() => startEditTask(task.id, "inProgress")}
                    >
                      <img src={editImage} alt="Edit Icon" />
                    </button>
                  </div>
                </>
              )}
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
            <div
              key={task.id}
              className="kanbanTask"
              style={{ backgroundColor: task.color }}
            >
              {editingTask === task.id ? (
                <div className="editable-task">
                  <input
                    type="text"
                    value={editingTitleDone}
                    onChange={(e) => setEditingTitleDone(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      saveEditedTask(task.id, editingTitleDone, "done")
                    }
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p>{task.title}</p>
                  <div className="kanbanTaskButtons">
                    <button onClick={() => deleteTask(task.id, "done")}>
                      <img src={deleteImage} alt="Delete Icon" />
                    </button>
                    <button onClick={() => startEditTask(task.id, "done")}>
                      <img src={editImage} alt="Edit Icon" />
                    </button>
                  </div>
                </>
              )}
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
            <button onClick={addTask}>Add Task</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default KanbanBoard;
