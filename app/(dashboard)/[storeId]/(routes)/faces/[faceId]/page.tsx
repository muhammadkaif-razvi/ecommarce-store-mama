import { db } from "@/lib/db";
import {  FaceForm, } from "./components/form";

interface Props {
  params: Promise<{ faceId: string }>;
}
const FacesPage = async (props: Props) => {
  const { faceId } = await props.params;
  const faces = await db.face.findUnique({
    where: {
      id: faceId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <FaceForm initialData={faces} />
      </div>
    </div>
  );
};
export default FacesPage;
