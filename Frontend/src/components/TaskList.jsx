import React from 'react';

const TaskList = ({ tasks, toggleCompletion, deleteTask }) => {
  return (
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
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
