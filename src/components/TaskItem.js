import React, { useState } from "react";
import axios from "axios"; // Import Axios for making API requests

// TaskItem Component - Displays an individual task with a checkbox to toggle its completion status
const TaskItem = ({ task }) => {
  // State to track whether the task is completed or not
  const [completed, setCompleted] = useState(task.completed);

  /**
   * Function to handle status change when the checkbox is clicked
   * It sends a PUT request to update the task's completion status in the backend
   */
  const handleStatusChange = async () => {
    try {
      // Send a request to update the task's 'completed' status
      const updatedTask = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        completed: !completed, // Toggle the completed status
      });

      // Update local state with the new completed status
      setCompleted(updatedTask.data.completed);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      {/* Checkbox to mark task as completed or not */}
      <input type="checkbox" checked={completed} onChange={handleStatusChange} />

      {/* Task title - If completed, apply strikethrough effect */}
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {task.title}
      </span>
    </div>
  );
};

export default TaskItem; // Export TaskItem component for use in other parts of the application
