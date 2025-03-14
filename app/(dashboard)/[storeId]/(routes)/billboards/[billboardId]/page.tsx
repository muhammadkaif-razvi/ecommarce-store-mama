import { db } from "@/lib/db";
import { BillboardForm } from "./components/Billboard-form";

interface BillboardProps {
  params: Promise<{ billboardId: string }>;
}
const BillboardPage = async (props: BillboardProps) => {
  const { billboardId } = await props.params;
  const Billboard = await db.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <BillboardForm initialData={Billboard} />
      </div>
    </div>
  );
};
export default BillboardPage;
