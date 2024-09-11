'use client'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
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
import { useEffect, useState } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";
import TaskForm from "@/components/AddTaskForm";

interface Task {
  id: string;
  taskName: string;
  title?: string;
  status: string;
  description: string;
  priority?: "LOW"| "MEDIUM" | "HIGH";
  // category: string;
}

interface TaskProps {
  task?: Task[];
}

export function TasksTable({categoryId}: {categoryId?: string}) {

  const [Task, setTask] = useState<Task[]>([])

  const [defaultasks, setTasks] = useState<Task[]>([
    { id: "TASK-8782", taskName: "string", description: "You can't compress the program without quantifying the open-source SSD...", status: "In Progress" },
    { id: "TASK-7878", taskName: "string", description: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "Backlog" },
  ]);

  const tasks = categoryId ? Task : defaultasks

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/tasks/${categoryId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTask(data);
      } catch (err) {
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchTasks();
  }, [categoryId]);
  
  
  const [filter, setFilter] = useState("");
  // const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
  //   type: "",
  //   title: "",
  //   status: "",
  //   // priority: "",
  // });



  // const handleAddTask = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('/api/tasks', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newTask),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to add task');
  //     }
  //     const addedTask: Task = await response.json();
  //     setTasks([...tasks, addedTask]);
  //     setNewTask({ type: "", title: "", status: "", priority: "" });
  //   } catch (error) {
  //     console.error('Error adding task:', error);
  //   }
  // };

  return (
    <div className="flex-1 p-8 bg-gray-300"> {/* bg-white dark: */}
      <TaskForm />
      
      <div className="flex justify-between items-center mb-4">
        <Input 
          placeholder="Filter tasks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-1/3 shadow-md border-gray-200"
        />
        <div className="flex space-x-2">

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Backlog</DropdownMenuItem>
              <DropdownMenuItem>Done</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Priority</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>High</DropdownMenuItem>
              <DropdownMenuItem>Medium</DropdownMenuItem>
              <DropdownMenuItem>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead>Title</TableHead>
            {/* <TableHead>Type</TableHead> */}
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(tasks) && tasks
            .filter((task) => task.taskName.toLowerCase().includes(filter.toLowerCase()))
            .map((task) => (
              <TableRow key={task.id}>
                <TableCell><input type="checkbox" /></TableCell>
                <TableCell>{task.taskName}</TableCell>
                {/* <TableCell>{task.type}</TableCell> */}
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
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
                        Copy payment ID
                      </DropdownMenuItem>
                      <DropdownMenuItem>View customer</DropdownMenuItem>
                      <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination
      <div className="flex justify-between items-center mt-4">
        <span>Rows per page</span>
        <Pagination total={100} currentPage={1} pageSize={10} />
      </div> */}
    </div>
  );
}
