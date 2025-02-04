import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/tasks", task);
    setTask({ title: "", description: "", dueDate: "" });
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input name="title" placeholder="Task Title" className="border p-2 rounded" value={task.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" className="border p-2 rounded" value={task.description} onChange={handleChange} />
      <input name="dueDate" type="date" className="border p-2 rounded" value={task.dueDate} onChange={handleChange} />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
    </form>
  );
};

export default TaskForm;
