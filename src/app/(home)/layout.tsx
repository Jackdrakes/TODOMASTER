// app/(home)layout.tsx
// 'use client'
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '@/app/(home)/loading';
import Sidebar from '@/components/Sidebar';
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';


export default async function DasahboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  {

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
      redirect("/auth/sign-in")
    }

  
  return (
        <>
          <Suspense fallback={<Loading />}>
            <div className='flex min-h-screen'>
              <Sidebar userid={session?.user.id} username={session?.user.username}/>
              <div className="flex-1 w-full  ml-64 bg-gray-300">
                {children}
              </div>
              <Toaster></Toaster>
            </div>
          </Suspense>
        </>
  );
}