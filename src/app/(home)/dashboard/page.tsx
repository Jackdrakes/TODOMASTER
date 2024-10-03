// app/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation"
import { authOptions } from '@/lib/auth';
import { TasksTable } from '@/components/TasksTable';

const DashboardPage = async() => {

  const session = await getServerSession(authOptions);


  if (!session || !session.user) {
    console.log('home page auth redirects to sign in ', )
    redirect("/auth/sign-in"); 
  }

  return (
      <TasksTable  />
  );
}

export default DashboardPage