// app/loading.tsx
import React from 'react';
import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-200">
      <Loader className="w-5 h-5 items-center animate-spin text-blue-500" />
      <p className="mt-1 text-gray-700">Loading, please wait...</p>
    </div>
  );
};

export default Loading;