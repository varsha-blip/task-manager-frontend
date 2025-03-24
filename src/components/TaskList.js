import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios for making API requests
import TaskItem from "./TaskItem"; // Import TaskItem component

/**
 * TaskList Component - Fetches and displays a list of tasks from the backend.
 * Each task is rendered as a TaskItem component.
 */
const TaskList = () => {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);

  /**
   * useEffect Hook - Fetches tasks from the backend API when the component mounts.
   * The empty dependency array ([]) ensures this runs only once when the component is first rendered.
   */
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks") // Fetch tasks from backend
      .then((res) => setTasks(res.data)) // Update state with fetched tasks
      .catch((err) => console.error("Error fetching tasks:", err)); // Handle errors
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      
      {/* Render each task using the TaskItem component */}
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList; // Export TaskList component for use in other parts of the application
