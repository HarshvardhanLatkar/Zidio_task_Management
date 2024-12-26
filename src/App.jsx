import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [role, setRole] = useState("Viewer");

  const addTask = () => {
    if (newTask) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, title: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Zidio Task Management</h1>
        <div className="role-selector">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
      </header>
      <main className="container">
        {role !== "Viewer" && (
          <div className="task-input">
            <input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
          </div>
        )}
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  disabled={role === "Viewer"}
                />
                <span
                  className={task.completed ? "completed" : ""}
                >
                  {task.title}
                </span>
              </label>
              {role === "Admin" && (
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
