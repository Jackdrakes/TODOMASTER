// app/categories/[id]/page.tsx
import { CategoryPages } from '@/components/categoryPage';


const CategoryPage = async ({ params }: { params: { id: string } }) => {
  const categoryId = params.id;

  return (
    <div className='container p-8 mx-auto py-10'>
      <CategoryPages categoryId={categoryId} />
    </div>
  );
};

export default CategoryPage;