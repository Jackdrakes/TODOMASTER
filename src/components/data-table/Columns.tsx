
import { labels, priorities, statuses } from "@/types/data"
import { DataTableColumnHeader } from "@/components/data-table/Column-header"
import { DataTableRowActions } from "@/components/data-table/Row-actions"

import { Checkbox } from "@/components/ui/checkbox"
import { Task } from "@/types/types"
import { ColumnDef, Row } from "@tanstack/react-table"
import { useState } from "react"

const TaskCheckbox = ({ row }: {row: Row<Task>}) => {
  const [checkedState, setCheckedState] = useState(row.original.completed);

  const handleCheckedChange = async (value: boolean) => {
    row.original.completed = !!value;
    setCheckedState(!!value);
    row.toggleSelected(!!value);
    try {
      const response = await fetch(`/api/tasks/${row.original.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !!value }),
      });

      if (!response.ok) {
        throw new Error("Failed to updated completion status of the task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Checkbox
      checked={checkedState}
      onCheckedChange={handleCheckedChange}
      aria-label="Select row"
      className="translate-y-[2px]"
    />
  );
};


export const columns= (onDeleteTask: (id:string) =>Promise<void>): ColumnDef<Task>[] => [ 
  {
    id: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => 
  
      (

        <TaskCheckbox row={row} />

      // <Checkbox
      //   checked={checkedState}
      //   onCheckedChange={async(value) => {
      //     row.original.completed = !!value
      //     setCheckedState(!!value)
      //     row.toggleSelected(!!value)
      //     try {
      //       const response = await fetch(`/api/tasks/${row.original.id}`,{
      //         method: 'PATCH',
      //         headers:{
      //           "Content-Type": "application/json"
      //         },
      //         body: JSON.stringify({completed: !!value }) // !taskToUpdate?.completed
      //       })
      
      //       if(!response.ok){
      //         throw new Error('Failed to updated completion status of the task')
      //       }
      //     } catch (error) {
      //       console.log(error)
      //     }
      //   }}
      //   aria-label="Select row"
      //   className="translate-y-[2px]"
      // />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "taskName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("taskName")}</div>,
    // enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
    //   const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{row.getValue("status")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{row.getValue("priority")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row} ) => <DataTableRowActions row={row} onDeleteTask={onDeleteTask}    />, // onDeleteTask={onDeleteTask}  
  },
]