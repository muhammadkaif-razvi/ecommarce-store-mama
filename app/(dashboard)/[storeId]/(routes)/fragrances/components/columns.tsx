"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type fragranceColumn = {
  id: string;
  name: string;

  createdAt: string;
};

export const columns: ColumnDef<fragranceColumn>[] = [
  {
    accessorKey: "name",
    header: "name",
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
