import { db } from "@/lib/db";
import {  FeatureForm, } from "./components/feature-form";

interface featureProps {
  params: Promise<{ featureId: string }>;
}
const FeaturesPage = async (props: featureProps) => {
  const { featureId } = await props.params;
  const feature = await db.features.findUnique({
    where: {
      id: featureId,
    },
  });
  return (
    <div className="mt-8 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <FeatureForm initialData={feature} />
      </div>
    </div>
  );
};
export default FeaturesPage;
