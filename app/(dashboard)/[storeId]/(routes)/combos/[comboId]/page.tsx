import { db } from "@/lib/db";
import { FormEnter } from "./components/form";

interface Props {
  params: Promise<{ comboId: string }>;
}
const combosPages = async (props: Props) => {
  const { comboId } = await props.params;
  const data = await db.combos.findUnique({
    where: {
      id: comboId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <FormEnter initialData={data} />
      </div>
    </div>
  );
};
export default combosPages;
