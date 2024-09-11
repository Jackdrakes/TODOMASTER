// app/categories/[id]/page.tsx
// 'use client'
import { TasksTable } from '@/components/TasksTable';


const CategoryPage = async ({ params }: { params: { id: string } }) => {
  const categoryId = params.id;

  return (

    <TasksTable categoryId={categoryId} />
   
  );
};

export default CategoryPage;