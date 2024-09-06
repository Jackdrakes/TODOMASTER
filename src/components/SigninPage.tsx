"use client";

import React, { useState } from 'react';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Mail, Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = () => {
    // Add your sign-in logic here
    console.log('Sign-in attempt:', { email, password });
  };
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    

    if (result?.error) {
      setError(result.error); // Set error message if authentication fails
    } else {
      router.push("/dashboard"); // Redirect to home page or a protected route
    }
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
              Sign In
            </Button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            
            <p className="text-center mt-4 text-gray-400">
              Haven&lsquo;t joined our task-taming team yet? Get on board and <a href="/signup" className="text-blue-400 underline">sign up</a>! Your to-do list will thank you.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;