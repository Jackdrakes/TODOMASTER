// components/Sidebar.tsx
'use client'
import { Search, CheckSquare, ListTodo, ShoppingCart, Plane, Film, Home, Briefcase, ChevronRight, ChevronLeft, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/types';

const workspaces = [
  { name: 'Personal Projects' },
  { name: 'Team Workspace' },
  { name: 'Freelance' },
  { name: 'Archived' },
]

const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  CheckSquare,
  ListTodo,
  ShoppingCart,
  Plane,
  Film,
  Home,
  Briefcase,
  Settings,
};

interface TodoDashboardProps {
  username: string;
  userid: string;
}


export default function Sidebar({username, userid}: TodoDashboardProps)  {

  const [data, setData] = useState<Category[]>([]);

  

  useEffect(() => {
    const categoriesdata = async() => {
      const response = await fetch('/api/categories', {
        method: 'GET',
        headers: {
          'Authorization': userid,
          'Content-Type':'application/json'
        },
      })

      if(response.ok){
          const result = await response.json()
          setData(result.categories)
      }
    }
    categoriesdata();
  }, [userid]);
  
  return (
    <div className="w-64 bg-gray-900 shadow-lg text-gray-400">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
            <Image 
              src="/images/profile.jpg" 
              alt="User"
              width={10} 
              height={10}
              className="w-10 h-10 rounded-full mr-3" />

            <span className="font-semibold  px-3">{username}</span>
        </div>

        <Link href={'/settings'}>
          <Settings className='w-5 h-5 '/>
        </Link>
        
      </div>

  

      <div className="px-4 mb-4">
        <div className="flex items-center bg-gray-100 rounded-md p-2">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <input type="text" placeholder="Search" className="bg-transparent outline-none w-full" />
        </div>
      </div>

      <nav>
        {data && data.map((item, index) => {
        const IconComponent = iconMap[item.categoryIcon]; 
        return (  
          <Link key={index} 
            href={ `/categories/${item.id}` || '#'}
            className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-600 hover:text-slate-300">
            {IconComponent && <IconComponent className="w-5 h-5 mr-3" />}
            <span>{item.categoryName}</span>
          </Link>
        )})}
      </nav>

      {/* Workspaces Section */}
      <div className="mt-6 px-4">
        <h2 className="text-gray-300 text-sm font-semibold mb-2">Workspaces</h2>
        <div>
          {workspaces.map((workspace, index) => (
            <a
              key={index}
              href="#"
              className="block px-4 py-2 text-gray-400 hover:bg-gray-500 rounded-md"
            >
              {workspace.name}
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}