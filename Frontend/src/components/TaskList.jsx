import React from "react";
import axios from "axios";

const TaskList = ({ tasks, fetchTasks }) => {
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
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="p-4 border rounded flex flex-col md:flex-row justify-between items-center bg-white shadow"
        >
          <div className="text-center md:text-left">
            <h2 className={`text-lg font-bold ${task.isCompleted ? "line-through text-gray-500" : ""}`}>
              {task.title}
            </h2>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-2 mt-2 md:mt-0">
            <button
              onClick={() => toggleCompletion(task)}
              className={`p-2 rounded ${task.isCompleted ? "bg-green-500" : "bg-gray-300"} text-white`}
            >
              {task.isCompleted ? "Completed" : "Mark Complete"}
            </button>
            <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
