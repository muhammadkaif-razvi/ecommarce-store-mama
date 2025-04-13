import { db } from "@/lib/db";
import {   FormEnter } from "./components/form";

interface Props {
  params: Promise<{ mileageId: string }>;
}
const MileagePage = async (props: Props) => {
  const { mileageId } = await props.params;
  const data = await db.mileage.findUnique({
    where: {
      id: mileageId,
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
export default MileagePage;
