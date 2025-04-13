import { db } from "@/lib/db";
import { FormEnter } from "./components/form";

interface Props {
  params: Promise<{ seatId: string }>;
}
const SeatsPages = async (props: Props) => {
  const { seatId } = await props.params;
  const data = await db.seats.findUnique({
    where: {
      id: seatId,
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
export default SeatsPages;
