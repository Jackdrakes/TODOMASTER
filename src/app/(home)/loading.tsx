// app/loading.tsx
import React from 'react';
import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-200">
      <Loader className="w-10 h-10 animate-spin text-blue-500" />
      <p className="mt-4 text-gray-700">Loading, please wait...</p>
    </div>
  );
};

export default Loading;