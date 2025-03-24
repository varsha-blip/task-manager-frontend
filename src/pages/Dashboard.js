import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // ✅ Define fetchTasks first
  const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token inside function
      if (!token) return;

      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // ✅ Add fetchTasks as a dependency

  // ✅ Correct API endpoint for adding a task
  const addTask = async () => {
    if (!newTask) return;
    try {
      const token = localStorage.getItem("token"); // ✅ Get token inside function
      if (!token) return;

      const res = await axios.post(
        "http://localhost:5000/api/tasks/user",
        { title: newTask }, // 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks([...tasks, res.data]); // ✅ Append new task
      setNewTask(""); // ✅ Clear input field
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token inside function
      if (!token) return;

      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((task) => task._id !== id)); // ✅ Remove task from state
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Your Tasks</h2>
      <div className="task-input">
        <input
          type="text"
          placeholder="New Task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <span>{task.title}</span>
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
