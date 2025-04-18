"use client";

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Column } from "./columns";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: Column;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const { update } = useSession();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("hair Id copied");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/hairs/${data.id}`);
      router.refresh();
      update();
      toast.success(" hair deleted.");
    } catch {
      toast.error("Make sure you removed all products using this hairs first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={() => {
          onDelete();
        }}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuLabel
            onClick={() => {
              onCopy(data.id);
            }}
            className="flex flex-row items-center"
          >
            <Copy className=" mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuLabel>
          <DropdownMenuLabel
            onClick={() => router.push(`/${params.storeId}/hairs/${data.id}`)}
            className="flex flex-row items-center"
          >
            <Edit className=" mr-2 h-4 w-4" />
            Update
          </DropdownMenuLabel>
          <DropdownMenuLabel
            onClick={() => {
              setOpen(true);
            }}
            className="flex flex-row items-center"
          >
            <Trash className=" mr-2 h-4 w-4" />
            Delete
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
