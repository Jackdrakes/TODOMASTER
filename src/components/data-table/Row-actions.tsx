"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { useState } from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogTitle, 
  DialogTrigger } from "@/components/ui/dialog"
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue } from "@/components/ui/select"
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuRadioGroup,
DropdownMenuRadioItem,
DropdownMenuSeparator,
DropdownMenuShortcut,
DropdownMenuSub,
DropdownMenuSubContent,
DropdownMenuSubTrigger,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { labels } from "@/types/data"
import { Task, Priority, Status } from "@/types/types"
import { toast } from "@/hooks/use-toast"

interface DataTableRowActionsProps<TData> {
row: Row<TData>;
onDeleteTask:(id: string)=> void;
onEditTask:(id: string,taskName: string, description: string, priority: Priority, status: Status ) => void;
}

export function DataTableRowActions<TData>({
row,
onDeleteTask,
onEditTask,
}: DataTableRowActionsProps<TData>) {

const task = row.original as Task

const handleDeleteTask = async (e: React.MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()

  try {
    const response = await fetch(`/api/tasks/${task.id}`,
      {method: 'DELETE',}
    )
    if(!response.ok) throw new Error('Failed to Delete Task')
    onDeleteTask(task.id)
  } catch (error) {
    console.log(error)
  }

  toast({
    variant: 'destructive',
    description: "Task Deleted",
    duration: 2000,
  })
}


  const [isOpen, setIsOpen] = useState(false);

  const [taskName, setTaskName] = useState<string>(task.taskName);
  const [description, setDescription] = useState<string>(task.description);
  const [priority, setPriority] = useState<Priority>(task.priority ?? 'Low');
  const [Status, setStatus] = useState(task.status)

  const handleEditTaskDialog = () => {
    setIsOpen(true);
  }

  const handleEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/tasks/${task.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ taskName, description, priority, Status })
        }
      )
      if (!response.ok) throw new Error('Failed to Update Task')
      const data = await response.json()
      console.log("response of edit api", taskName, description, priority, Status)

      onEditTask(task.id, taskName, description, priority, Status)
    } catch (error) {
      console.log(error)
    }
    setIsOpen(false);
  }


return (
  <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEditTaskDialog}>Edit</DropdownMenuItem>
        {/* <DropdownMenuItem>Make a copy</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteTask} className="text-rose-500" >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    {/* EDIT Dialog*/}
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button />
        </DialogTrigger>
        <DialogContent className="w-[400px]">
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Edit task details</DialogDescription>
            {/* <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
              </label>
              <br />
              <label>
                Description:
                <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
              </label>
              <br />
              <button type="submit">Update Task</button>
            </form> */}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Task
                </Label>
                <Input 
                  id="name" 
                  // placeholder={taskTitle}
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="col-span-3" 
                  required />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea 
                  id="description" 
                  // placeholder={task.description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3" 
                  required /> 
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">Priority</Label>
                <Select onValueChange={(value) => setPriority(value as Priority)}>        
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select onValueChange={(value) => setStatus(value as Status)}>        
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todo">Todo</SelectItem>
                  <SelectItem value="InProgress">Inprogress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Backlog">Backlog</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
                </Select>
              </div>  
            </div>

            <Button className="items-center" onClick={handleEditTask} type="submit">
              Edit
            </Button>
            <DialogClose />
        </DialogContent>
      </Dialog>
  </>
)
}