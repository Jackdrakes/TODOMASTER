// app/(home)layout.tsx
'use client'
import { Suspense } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '@/app/(home)/loading';
import Sidebar from '@/components/Sidebar';
import { TasksTable } from '@/components/TasksTable';


export default function DasahboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  {

  
    const { data: session, status } = useSession()

    // console.log()

    if (status === "loading") {
      return <Loading/>
    }
    
    if (status === "unauthenticated") {
      redirect("/auth/sign-in"); 
    }

  
  return (
    <html>
      <body>
        <Suspense fallback={<Loading />}>
        <div className='flex h-screen'>
          <Sidebar userid={session?.user.id} username={session?.user.username}/>
          <div className="flex w-full">
   
            {children}
          </div>
        </div>
        </Suspense>

      </body>
    </html>
  );
}