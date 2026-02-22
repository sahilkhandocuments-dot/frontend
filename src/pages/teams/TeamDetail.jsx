import React from 'react';
import { useParams } from 'react-router-dom';

function TeamDetail() {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Team Details</h1>
      <p className="text-gray-600">Team ID: {id}</p>
      <p className="text-gray-600 mt-2">Team details coming soon...</p>
    </div>
  );
}

export default TeamDetail;
