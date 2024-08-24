import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from '../../firebase/firebaseConfig';
import Task from '../task/task';
// import User from '../userList/usList';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasksData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks from Firebase:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users from Firebase:", error);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);

  const addTask = async () => {
    if (newTask.trim()) {
      const task = { name: newTask, completed: false, assignedUser: selectedUser ? users.find(user => user.id === selectedUser) : null };

      try {
        const docRef = await addDoc(collection(db, "tasks"), task);
        setTasks([...tasks, { ...task, id: docRef.id }]);
        setNewTask('');
        setSelectedUser('');
      } catch (error) {
        console.error("Error adding task to Firebase:", error);
      }
    }
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const markComplete = async (taskId) => {
    try {
      const task = tasks.find(task => task.id === taskId);
      await updateDoc(doc(db, "tasks", taskId), {
        completed: !task.completed
      });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
    } catch (error) {
      console.error("Error updating task in Firebase:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task from Firebase:", error);
    }
  };

  return (
    <div className="task-list max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg flex gap-8 flex-col lg:flex-row">
      <div className="card w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-md mb-6 lg:mb-0">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add a New Task</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter a new task..."
          />
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={addTask}
            className="w-52 bg-cyan-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300"
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="card w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-md mb-6 lg:mb-0">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Task List</h2>
        <div className="space-y-4">
          {tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
              onMarkComplete={markComplete}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default TaskList;
