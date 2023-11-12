import React, { useState } from "react";
import "../styles/Todo.css";
import addImage from "../assets/add.png";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("Adicione uma tarefa");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        { id: tasks.length + 1, text: newTask, completed: false },
        ...tasks,
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>To-do List</h1>
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Enter task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>
          <img src={addImage} />
        </button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <p>{task.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
