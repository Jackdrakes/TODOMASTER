"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
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
import { Task } from "@/types/types"
import { toast } from "@/hooks/use-toast"

interface DataTableRowActionsProps<TData> {
row: Row<TData>;
onDeleteTask:(id: string)=> void;
}

export function DataTableRowActions<TData>({
row,
onDeleteTask
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


return (
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
      <DropdownMenuItem>Edit</DropdownMenuItem>
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
)
}