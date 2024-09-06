// app/page.tsx
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';

import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { TasksTable } from '@/components/TasksTable';

const Page = async() => {

  const session = await getServerSession(authOptions);


  if (!session || !session.user) {
    redirect("/auth/sign-in"); 
  }
  // console.log('home -session', session)
  
  const name = session.user.username

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Sidebar username={name} />
      {/* <MainContent /> */}

      <TasksTable />
    </div>
  );
}

export default Page