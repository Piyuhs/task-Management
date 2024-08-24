import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ task, onToggleComplete, onDelete, onMarkComplete }) => {
  if (!task) return null;

  return (
    <div className={`task ${task.completed ? 'completed' : ''} p-6 mb-4 border rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white relative overflow-hidden`}>
      <div className={`absolute inset-0 rounded-lg ${task.completed ? 'bg-green-100' : 'bg-yellow-100'} opacity-30`}></div>
      <div className="relative z-10 flex justify-between items-center">
        <span
          className={`cursor-pointer text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'} transition-all duration-300`}
          onClick={() => onToggleComplete(task.id)}
        >
          {task.name}
        </span>
        {task.assignedUser && (
          <span className="text-sm text-gray-500">Assigned to: {task.assignedUser.name}</span>
        )}
        <div className="flex items-center space-x-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${task.completed ? 'text-green-500' : 'bg-green-500 text-white hover:bg-green-600'}`}
            onClick={() => onMarkComplete(task.id)}
          >
            {task.completed ? '✔️' : 'Mark Complete'}
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    assignedUser: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  onToggleComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMarkComplete: PropTypes.func.isRequired,
};

export default Task;
