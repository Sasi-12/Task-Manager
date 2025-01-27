import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/tasks', formData);
    setFormData({ title: '', description: '', dueDate: '' });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  const toggleCompletion = async (task) => {
    await axios.put(`http://localhost:5000/tasks/${task._id}`, {
      ...task,
      isCompleted: !task.isCompleted,
    });
    fetchTasks();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

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

      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <div>
              <h2 className={`${task.isCompleted ? 'line-through' : ''} text-lg font-bold`}>{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <button
                onClick={() => toggleCompletion(task)}
                className={`mr-2 p-2 rounded ${task.isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                {task.isCompleted ? 'Completed' : 'Mark Complete'}
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
