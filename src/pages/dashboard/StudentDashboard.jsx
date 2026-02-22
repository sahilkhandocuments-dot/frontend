import React from 'react';

function UserDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">My Registrations</h2>
          <p className="text-gray-600">View your registered events</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <p className="text-gray-600">Events you're interested in</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">My Profile</h2>
          <p className="text-gray-600">Manage your profile</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
