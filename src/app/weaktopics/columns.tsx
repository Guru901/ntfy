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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

async function deleteQuestion(_id: string) {
  const { data } = await axios.post("/api/deleteQuestion", JSON.stringify(_id));
  if (data?.success) {
    window.location.reload();
  }
}

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
  }
];
