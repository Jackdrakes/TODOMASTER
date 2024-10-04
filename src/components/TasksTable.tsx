'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TaskForm from "@/components/AddTaskForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import {Task} from "@/types/types"
import { toast } from "@/hooks/use-toast";



const defaultasks: Task[] = [
  { id: "TASK-8782", taskName: "string", description: "You can't compress the program without quantifying the open-source SSD...", status: "InProgress", completed: true },
  { id: "TASK-7878", taskName: "string", description: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "Backlog",completed: false, },
]

export function TasksTable({categoryId}: {categoryId?: string}) {

  const [Tasks, setTasks] = useState<Task[]>([])
  const [selctedpriority, setSelctedpriority] = useState<string>("")
  const [filter, setFilter] = useState("");


  useEffect(() => {
    const fetchTasks = async () => {
      if (categoryId) {
        try {
          const response = await fetch(`/api/tasks/${categoryId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }
          const data = await response.json();
          setTasks(data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setTasks(defaultasks);
      }
    };

    fetchTasks();
  }, [categoryId,]);

  // handle deletetask function
  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setTasks(Tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(error)
    }

    toast({
      variant: 'destructive',
      description: "Task Deleted",
      duration: 2000,
    })
  }
  
  //  handle the checkboxes
  const handleCheckboxChange = async (taskId: string) => {

    const taskToUpdate = Tasks.find((task)=> task.id === taskId)

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    try {
      const response = await fetch(`/api/tasks/${taskId}`,{
        method: 'PATCH',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({completed: !taskToUpdate?.completed })
      })

      if(!response.ok){
        throw new Error('Failed to updated completion status of the task')
      }
    } catch (error) {
      console.log(error)
    }
  };
  
  // Add new task in ui
  const handleCallback = (updatedTask: Task) => {
    setTasks((prevTasks)=>[...prevTasks, updatedTask]) 
  }

  return (
    <div className="flex-1 p-8 bg-gray-300">
      <TaskForm taskCallback={handleCallback}  /> 
      
      <div className="flex justify-between items-center mb-4">
        <Input 
          placeholder="Filter tasks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-1/3 shadow-md border-gray-200"
        />
        <div className="flex space-x-2">

        <DropdownMenu>
          {/* <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger> */}
          {/* <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent> */}
        </DropdownMenu>
          {/* 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Backlog</DropdownMenuItem>
              <DropdownMenuItem>Done</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Priority</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => (setSelctedpriority("HIGH"))}>High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => (setSelctedpriority("MEDIUM"))}>Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => (setSelctedpriority("LOW"))}>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            {/* <TableHead>Status</TableHead> */}
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(Tasks) && Tasks
            .filter((task) => task?.taskName?.toLowerCase().includes(filter.toLowerCase()))
            .map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleCheckboxChange(task.id)}
                  />
                </TableCell>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.description}</TableCell>
                {/* <TableCell>{task.status}</TableCell> */}
                <TableCell>{task.priority}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={()=>(handleDeleteTask(task.id))} className="text-rose-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                
              </TableRow>
            ))}
        </TableBody>
      </Table>

    </div>
  );
}
