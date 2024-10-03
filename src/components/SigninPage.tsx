"use client";

import React, { useState } from 'react';

import { signIn, useSession } from "next-auth/react";
import { useRouter,  } from "next/navigation";

import { Mail, Lock, LoaderCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loading from '@/app/(home)/loading';
import Link from 'next/link';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();

  const { status } = useSession()

  if (status === "loading") {
      return <Loading/>
  }    
  if (status === "authenticated") {
      router.push("/dashboard"); 
  }

  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoading(true)

    await signIn("credentials", {
      callbackUrl: '/dashboard',
      redirect: true,
      email,
      password,
    });
    
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSignIn} className="w-full">
              {loading ? <LoaderCircle className="w-5 h-5 animate-spin text-white" /> : <p>Sign In</p>}
            </Button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            
            <p className="text-center mt-4 text-gray-400">
              Haven&lsquo;t joined our task-taming team yet? Get on board and <Link href="/auth/sign-up" className="text-blue-400 font-semibold underline">sign up</Link>! Your to-do list will thank you.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;