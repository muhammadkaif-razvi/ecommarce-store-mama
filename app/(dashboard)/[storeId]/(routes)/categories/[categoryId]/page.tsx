import { db } from "@/lib/db";
import { CategoryForm } from "./components/Category-form";

interface BillboardProps {
  params: Promise<{ categoryId: string,storeId:string }>;
}
const CategoryPage = async (props: BillboardProps) => {

  const { categoryId } = await props.params;
  const { storeId } = await props.params;


  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  
  const billboards = await db.billboard.findMany({
    where: {
      storeId,
    },
  });

  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <CategoryForm 
        billboards={billboards} 
        initialData={category} />
      </div>
    </div>
  );
};
export default CategoryPage;
