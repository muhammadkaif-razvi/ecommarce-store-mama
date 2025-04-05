import { db } from "@/lib/db";
import { ColorForm } from "./components/color-form";

interface BillboardProps {
  params: Promise<{ colorId: string }>;
}
const ColorPage = async (props: BillboardProps) => {
  const { colorId } = await props.params;
  const size = await db.color.findUnique({
    where: {
      id: colorId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <ColorForm initialData={size} />
      </div>
    </div>
  );
};
export default ColorPage;
