'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const tasks = [
  { id: "TASK-8782", type: "Documentation", title: "You can't compress the program without quantifying the open-source SSD...", status: "In Progress", priority: "Medium" },
  { id: "TASK-7878", type: "Documentation", title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "Backlog", priority: "Medium" },
];

export function TasksTable() {
  const [filter, setFilter] = useState("");

  return (
    <div className="flex-1 p-8 bg-gray-300"> {/* bg-white dark: */}
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks
            .filter((task) => task.title.toLowerCase().includes(filter.toLowerCase()))
            .map((task) => (
              <TableRow key={task.id}>
                <TableCell><input type="checkbox" /></TableCell>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.type}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
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
