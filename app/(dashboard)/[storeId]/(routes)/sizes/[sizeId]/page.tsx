import { db } from "@/lib/db";
import { SizeForm } from "./components/size-form";

interface BillboardProps {
  params: Promise<{ sizeId: string }>;
}
const SizePage = async (props: BillboardProps) => {
  const { sizeId } = await props.params;
  const size = await db.size.findUnique({
    where: {
      id: sizeId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};
export default SizePage;
