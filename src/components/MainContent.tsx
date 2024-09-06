// components/MainContent.tsx
import { PlusCircle, ChevronDown } from 'lucide-react';

export default function MainContent() {
  return (
    <div className="flex-1 p-8">
      <div className="bg-gray-300 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Suggestions</h1>
        <p className="text-gray-600 mb-4">Wednesday 29 March</p>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Yesterday</h2>
            <span className="text-sm text-gray-500">1 OF 3 COMPLETED</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Gym workout</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Buy travel insurance</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Update blog</span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Overdue</h2>
            <span className="text-sm text-gray-500">1 OVERDUE</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-3" />
            <span>Book flights to Seattle</span>
          </div>
        </div>
        
        <div className="mt-6 flex items-center text-blue-600">
          <PlusCircle className="w-5 h-5 mr-2" />
          <span>Add a task</span>
        </div>
      </div>
    </div>
  );
}