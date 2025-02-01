import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/tasks", formData);
    setFormData({ title: "", description: "", dueDate: "" });
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Task Title"
        className="border p-2 rounded"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        className="border p-2 rounded"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="date"
        className="border p-2 rounded"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
