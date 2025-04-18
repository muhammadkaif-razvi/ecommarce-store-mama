"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns, variantColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface variantClientProps {
  data: variantColumn[];
}

export const VariantClient: React.FC<variantClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className=" mt-8 flex items-center justify-between">
        <Heading
          title={` variant(${data.length})`}
          description="Manage variants for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/variants/new`);
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
      <Heading title="API" description="API calls for variants" />
      <Separator className="mb-2" />
      <ApiList entityIdName="variantId" entityName="variants" />
    </>
  );
};
