import { db } from "@/lib/db";
import {   FormEnter } from "./components/form";

interface Props {
  params: Promise<{ engineId: string }>;
}
const EnginePages = async (props: Props) => {
  const { engineId } = await props.params;
  const data = await db.engine.findUnique({
    where: {
      id: engineId,
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
export default EnginePages;
