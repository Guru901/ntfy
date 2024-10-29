"use client";

import { QuestionsCount } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<QuestionsCount>[] = [
  {
    accessorKey: "name",
    header: "Questions",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
