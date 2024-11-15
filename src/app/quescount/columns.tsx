"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QuestionsCount } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

async function deleteQuestion(_id: string) {
  const { data } = await axios.post("/api/deleteQuestion", JSON.stringify(_id));
  if (data?.success) {
    location.reload();
  }
}

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

  {
    id: "actions",

    enableHiding: false,

    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>

              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/question/${task._id}`}>
              <DropdownMenuItem>Edit Question</DropdownMenuItem>
            </Link>

            <DropdownMenuItem onClick={() => deleteQuestion(task._id)}>
              Delete Question
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
