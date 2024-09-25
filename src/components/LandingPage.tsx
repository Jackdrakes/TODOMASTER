'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, List, Zap, LucideIcon } from 'lucide-react';
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-700 to-zinc-800 text-white">
      <nav className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold md:mb-0">TodoMaster</h1>
        <div className="space-x-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Link href="/auth/sign-in">
            <Button className="bg-gray-800" variant="outline">Login</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto mt-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Manage Your Tasks with Ease</h2>
        <p className="text-lg md:text-xl mb-10 text-gray-300">Stay organized, boost productivity, and achieve your goals with TodoMaster</p>
        <Link href="/auth/sign-up">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Get Started for Free</Button>
        </Link>

        <div className="mt-20">
          <Image 
            src="/images/dashboard.png"  
            alt="TodoMaster Dashboard"
            width={1200}  
            height={800}  
            className="rounded-lg shadow-2xl mx-auto" 
          />
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={CheckCircle}
            title="Easy Task Management"
            description="Create, organize, and complete tasks effortlessly"
          />
          <FeatureCard 
            icon={List}
            title="Smart Lists"
            description="Automatically categorize and prioritize your tasks"
          />
          <FeatureCard 
            icon={Zap}
            title="Boost Productivity"
            description="Track your progress and stay motivated"
          />
        </div>
        

      </main>

      <footer className="container mx-auto mt-20 py-6 text-center text-gray-400">
        © 2024 TodoMaster. All rights reserved.
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <div className="flex justify-center mb-4">
      <Icon className="w-12 h-12 text-blue-400" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default LandingPage;