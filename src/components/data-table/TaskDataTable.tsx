'use client'
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTableToolbar } from "@/components/data-table/Tool-bar"
import { Priority, Status, Task } from "@/types/types"
import TaskForm from "@/components/AddTaskForm"


interface DataTableProps<TData extends Task, TValue> {
  columns: (
    onDeleteTask: (id:string) =>Promise<void>,
    onEditTask:(id: string, taskName: string, description: string, priority: Priority, status: Status, ) =>Promise<void>,) => ColumnDef<TData, any>[];
  data: TData[];  
}

export function DataTable<TData extends Task, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [Tasks, setTasks] = React.useState<Task[]>(data)

  

  const handleDeleteTask = async (id: string) =>{
    try{
      setTasks((prevTasks) => {
        const newTasks = prevTasks.filter((task) => task.id !== id);
        return newTasks;
      });
    } catch (error){
      console.log(error)
    }   
  };

  const handleEditTask = async(id: string, taskName: string, description: string, priority: Priority, status: Status) =>{
    setTasks((prevTasks) => {
      const index = prevTasks.findIndex((task) => id === task.id);
      if (index !== -1) {
        prevTasks[index] = { ...prevTasks[index], taskName, description, priority, status };
      }
      return [...prevTasks,];
    });
  }

  const tabecolumns = columns(handleDeleteTask, handleEditTask) as Task[]

  const table = useReactTable({
    data: Tasks,
    columns: tabecolumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const handleCallback = (updatedTask: Task) => {
    setTasks((prevTasks)=>[...prevTasks, updatedTask]) 
  }

  return (
    <div className="space-y-4">
      <TaskForm taskCallback={handleCallback}/>
      <DataTableToolbar table={table} />
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}