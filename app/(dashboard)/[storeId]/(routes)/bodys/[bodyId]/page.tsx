import { db } from "@/lib/db";
import { FormEnter } from "./components/form";

interface Props {
  params: Promise<{ bodyId: string }>;
}
const bodyPage = async (props: Props) => {
  const { bodyId } = await props.params;
  const data = await db.body.findUnique({
    where: {
      id: bodyId,
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
export default bodyPage;
