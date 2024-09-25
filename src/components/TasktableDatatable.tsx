//  workspace page
'use client'
import { columns } from "@/components/data-table/Columns"
import { Task } from "@/types/types"
import { DataTable } from "@/components/data-table/TaskDataTable"
import React from "react"



const fetchTasks = async():Promise<Task[]> =>{
  const response = await fetch('/api/tasks/cm1c49zyw0001fe9iq9w2n98b')
  if(!response.ok) throw new Error("Failed to get workspace")
  return response.json()
}


export default function DemoPage() {

  const [Tasks, setTasks] = React.useState<Task[]>([])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        console.log('useeffect')
      } catch (error) {
        console.error(error);
      }
    };
    
    getData();
  }, [])


  const handleDeleteTask = async (id: string) => {
    try{
      setTasks((prevTasks) => {
        const newTasks = prevTasks.filter((task) => task.id !== id);
        console.log("Updated Tasks: ", newTasks); // Log updated tasks
        return newTasks;
      });
      console.log('demopage delete function')
    } catch (error){
      console.log(error)
    }   
  };
  

  return (
    <div className="container p-8 mx-auto py-10">
      <DataTable columns={columns} data={Tasks}  /> {/*columns={columns(handleDeleteTask)} */}
    </div>
  )
}
