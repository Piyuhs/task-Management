import React, { useState } from 'react';
import { db, collection, addDoc } from '../../firebase/firebaseConfig'; // Adjust import based on your Firebase setup

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = async () => {
    if (name.trim() === '' || email.trim() === '') {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, "users"), { name, email });
      setName('');
      setEmail('');
      setError('');
      alert('User added successfully!');
    } catch (error) {
      console.error("Error adding user to Firebase:", error);
      setError('Failed to add user. Please try again.');
    }
  };

  return (
    <div className="add-user max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New User</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter user's name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter user's email"
        />
      </div>
      <button
        onClick={handleAddUser}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-all duration-300"
      >
        Add User
      </button>
    </div>
  );
};

export default AddUser;
