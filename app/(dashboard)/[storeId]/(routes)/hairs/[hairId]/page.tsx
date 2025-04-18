import { db } from "@/lib/db";
import { FormEnter } from "./components/form";

interface Props {
  params: Promise<{ hairId: string }>;
}
const hairPages = async (props: Props) => {
  const { hairId } = await props.params;
  const data = await db.hair.findUnique({
    where: {
      id: hairId,
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
export default hairPages;
