'use client'
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/TaskDataTable"
import { Task } from "@/types/types";
import { columns } from "@/components/data-table/Columns";

const defaultasks = [
    { id: "TASK-8782", taskName: "string", description: "You can't compress the program without quantifying the open-source SSD...", status: "In Progress", completed: true },
    { id: "TASK-7878", taskName: "string", description: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "Backlog",completed: false, },
  ]

export function CategoryPages({categoryId}: {categoryId?: string}) {

    const [Tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState<boolean>()

    useEffect(() => {
        const fetchTasks = async () => {
          setLoading(true)
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
            } finally{
              setLoading(false)
            }
          } else {
            setTasks(defaultasks);
          }
        };
    
        fetchTasks();
    }, [categoryId,]);

    return(
      <div>
        {loading ? (<div></div>) : (<DataTable columns={columns} data={Tasks}/>) }
      </div>
    )
}

