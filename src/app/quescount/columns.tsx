"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type QuestionsCount = {
  questions: string;
  subject: string;
  date: string;
};

export const columns: ColumnDef<QuestionsCount>[] = [
  {
    accessorKey: "questions",
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
