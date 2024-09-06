// auth/sign-up

"use client";

import React, { useState } from 'react';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Mail, Lock, CircleUser } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SignUpPageRoute = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  
    if (result?.error) {
      setError(result.error); // Set error message if authentication fails
    } else {
      router.push("/"); // Redirect to home page or a protected route
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    // Send a POST request to the API to create a new user
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username}),
    });

    if (response.ok) {
      // Registration successful, redirect to sign-in page
      router.push("/auth/sign-in");
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Registration failed. Please try again."); 
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <Card className="max-w-md w-full bg-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
          <div className="relative">
              <CircleUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
              />
            </div>
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
            <Button onClick={handleSignUp} className="w-full">
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPageRoute;