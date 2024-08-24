import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user p-6 mb-4 border rounded-lg shadow-lg bg-white">
      <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default User;
