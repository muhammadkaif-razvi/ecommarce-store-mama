import { db } from "@/lib/db";
import {  TransmissionForm,} from "./components/transmission-form";

interface transmissionProps {
  params: Promise<{ transmissionId: string }>;
}
const TransmissionPages = async (props: transmissionProps) => {
  const { transmissionId } = await props.params;
  const transmission = await db.transmission.findUnique({
    where: {
      id: transmissionId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <TransmissionForm initialData={transmission} />
      </div>
    </div>
  );
};
export default TransmissionPages;
