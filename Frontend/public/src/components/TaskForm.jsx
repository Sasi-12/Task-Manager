import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    setFormData({ title: '', description: '', dueDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Task Title"
        className="border p-2 mr-2"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        className="border p-2 mr-2"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="date"
        className="border p-2 mr-2"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
    </form>
  );
};

export default TaskForm;
