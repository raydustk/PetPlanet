import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Profile = () => {
  const { user } = useContext(GlobalContext);

  if (!user) {
    return <p>Please log in or register to view your profile.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>City:</strong> {user.city || 'Not specified'}</p>
      <p><strong>Birthday:</strong> {user.birthday || 'Not specified'}</p>
    </div>
  );
};

export default Profile;
