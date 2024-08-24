import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from '../../firebase/firebaseConfig';

const TaskCard = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Tasks</h2>
      <ul className="list-disc list-inside">
        {tasks.length === 0 ? (
          <li className="text-gray-500">No tasks added yet.</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between py-2 border-b border-gray-300">
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onToggleComplete(task.id, !task.completed)}
                  className={`px-3 py-1 rounded-lg text-white ${task.completed ? 'bg-green-500' : 'bg-blue-500'} hover:bg-opacity-80 transition-colors`}
                >
                  {task.completed ? 'Completed' : 'Complete'}
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const CreateTaskCard = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      await onAddTask(task);
      setTask('');
    }
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Create Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          className="border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

const New = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'ownTask'));
      const taskList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setTasks(taskList);
    };

    fetchTasks();
  }, []);

  const addTask = async (taskText) => {
    try {
      const docRef = await addDoc(collection(db, 'ownTask'), { text: taskText, completed: false });
      setTasks([...tasks, { text: taskText, completed: false, id: docRef.id }]);
    } catch (e) {
      console.error("Error adding task: ", e);
    }
  };

  const toggleComplete = async (id, completed) => {
    const taskRef = doc(db, 'ownTask', id);
    await updateDoc(taskRef, { completed });
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed } : task
    ));
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'ownTask', id));
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <CreateTaskCard onAddTask={addTask} />
        <TaskCard tasks={tasks} onToggleComplete={toggleComplete} onDelete={deleteTask} />
      </div>
    </div>
  );
};

export default New;
