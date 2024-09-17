// app/(home)layout.tsx
'use client'
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '@/app/(home)/loading';
import Sidebar from '@/components/Sidebar';
import { Toaster } from "@/components/ui/toaster";


export default function DasahboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  {

    const { data: session, status } = useSession()

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
            <div className="flex w-full bg-gray-300">
              {children}
            </div>
            <Toaster></Toaster>
          </div>
        </Suspense>

      </body>
    </html>
  );
}