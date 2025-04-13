import { db } from "@/lib/db";
import {   FormEnter } from "./components/form";

interface Props {
  params: Promise<{ airbagId: string }>;
}
const  AirbagPages = async (props: Props) => {
  const { airbagId } = await props.params;
  const data = await db.airbag.findUnique({
    where: {
      id: airbagId,
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
export default AirbagPages;
