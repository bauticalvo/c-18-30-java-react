import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
            <div className="text-xl font-semibold">Loading ...</div>
          </div>;
  }

  return (
    isAuthenticated && (
      <div className="max-w-sm mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img 
            src={user.picture} 
            alt={user.name}
            className="w-24 h-24 rounded-full shadow-lg mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      </div>
    )
  );
}

export default Profile