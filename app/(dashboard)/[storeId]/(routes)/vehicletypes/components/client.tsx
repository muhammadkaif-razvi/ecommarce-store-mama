"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns, vehicleTypeColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface VehicleTypeClientProps {
  data: vehicleTypeColumn[];
}

export const VehicleTypeClient: React.FC<VehicleTypeClientProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className=" mt-8 flex items-center justify-between">
        <Heading
          title={` Vehicle Types(${data.length})`}
          description="Manage Vehicle Types for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/vehicletypes/new`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <div className="mt-2"></div>
      <Separator />
      <div className="mt-2"></div>
      <DataTable columns={columns} data={data} searchKey="name" />{" "}
      <Heading title="API" description="API calls for Vehicletypes" />
      <Separator className="mb-2" />
      <ApiList entityIdName="vehicleTypeId" entityName="vehicletypes" />
    </>
  );
};
