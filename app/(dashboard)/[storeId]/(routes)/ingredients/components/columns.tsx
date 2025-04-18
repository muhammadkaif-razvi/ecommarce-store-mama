"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ingredientColumn = {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
};

export const columns: ColumnDef<ingredientColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.image; 
      return (
        <img
          src={imageUrl}
          alt="Image"
          className="h-12 w-12 object-cover rounded"
        />
      );
    },
  },  
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
