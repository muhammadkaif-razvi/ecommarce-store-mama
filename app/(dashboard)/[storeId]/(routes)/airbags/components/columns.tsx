"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type Column = {
  id: string;
  name: string;

  createdAt: string;
};

export const columns: ColumnDef<Column>[] = [
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
