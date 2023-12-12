import React, { useState } from "react";
import "../styles/Todo.css";
import addImage from "../assets/add.png";

function TodoList() {
  // const templateType = "todolist";

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("Enter task name");
  const [isInputVisible, setIsInputVisible] = useState(false);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
      setIsInputVisible(false);
    }
  };

  return (
    <div className="todo-container">
      <div className="add-task-container">
        <h1>To-do List</h1>
        <button onClick={() => setIsInputVisible(true)}>
          <img src={addImage} alt="Add task" />
        </button>
      </div>
      <div className="task-list">
        {isInputVisible && (
          <div className={`task input-task`}>
            <input
              type="text"
              placeholder="Enter task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        )}

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

TodoList.templateType = "todolist";
export default TodoList;
