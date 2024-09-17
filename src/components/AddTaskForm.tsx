'use client'
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"

import { LoaderCircle, Plus } from "lucide-react";
import { useSession } from 'next-auth/react';
import { Category, Task } from '@/types/types';

// interface TaskFormProps {
//     closeSheet?: () => void;
//     closeDrawer?: () => void;
//   }
  
interface TaskFormData {
    title: string;
    description: string;
    // status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
}
  
interface TaskFormProps {
  taskCallback: (data: Task[]) => void;
}

const TaskForm = ({taskCallback}: TaskFormProps) => {
  
  const [taskName, setTaskName] = useState<string>('')
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');
  const [categoryid, setCategoryid] = useState<string>('')
  const { data, } = useSession()
  const [categorylist, setCategorylist] = useState<Category[]>([]);

  const [loading, setLoading] = useState<boolean>(false)

  const {toast} = useToast()

  useEffect(() => {
    const categoriesdata = async() => {
      const response = await fetch('/api/categories', {
        method: 'GET',
        headers: {
          'Authorization': data?.user.id,
          'Content-Type':'application/json'
        },
      })

      if(response.ok){
          const result = await response.json()
          setCategorylist(result.categories)
      }
    }
    categoriesdata();
  }, [data?.user.id]);

  const handleAddTask = async(e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const response = await fetch(`/api/tasks/${categoryid}`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName, description, priority, categoryid})
    });

    const updatedTask = await response.json()
    taskCallback(updatedTask)

    toast({
      variant: 'default',
      description: "Task Added, work on it",
    })

    setLoading(false)
    
  }

  return (
    <>
    {/* Sheet for Task Form */}
    <Sheet key='right'>
      <SheetTrigger asChild>
        <Button 
          className="fixed items-center w-13 h-13 bottom-6 right-6 bg-gray-200 text-gray-800 p-4 rounded-full shadow-lg hover:bg-white">
            <Plus className="h-6 w-6"/>
        </Button>
      </SheetTrigger>

      <SheetContent side='right'>
        <SheetHeader>
            <SheetTitle>Ready to Conquer Your Day?</SheetTitle>
            <SheetDescription>
              Add a task and start turning your to-dos into ta-das! No task is too small—let&lsquo;s get this done!
            </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task
            </Label>
            <Input 
              id="name" 
              placeholder="What's the plan?" 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="col-span-3" 
              required />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Add a bit more detail..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">Priority</Label>
            <Select onValueChange={(value) => setPriority(value as 'LOW' | 'MEDIUM' | "HIGH")}>        
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
            </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">Category</Label>
            <Select onValueChange={(value) => setCategoryid(value)}>        
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categorylist && categorylist.map((category, index) =>{
                return (
                  <SelectItem key={index} value={category.id}>{category.categoryName}</SelectItem>
                )
              })}
            </SelectContent>
            </Select>
          </div>

        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleAddTask}  type='submit'>
              {loading ? <LoaderCircle className="w-5 h-5 animate-spin text-white" /> : <p>Let&lsquo;s Do This!</p>}
            </Button>
          </SheetClose>
        </SheetFooter>

      </SheetContent>
      </Sheet>
    </>
  )

  
        
}

export default TaskForm;
