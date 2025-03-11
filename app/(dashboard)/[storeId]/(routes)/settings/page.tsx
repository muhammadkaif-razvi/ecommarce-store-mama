import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";


const SettingsPage = async () => {
  const user = await currentUser();
  const storeId = user.stores.id;
  const store = await db.store.findFirst({
    where: {
      id:  storeId,
      userId: user.id,
    },
  });

  if (!store) {
    redirect("/stores-setup");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store}/>
      </div>
    </div>
  );
};

export default SettingsPage;
