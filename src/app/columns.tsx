import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/lib/type";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import axios from "axios";

async function deleteTask(row: any) {
  const { data } = await axios.post("/api/deleteTask", JSON.stringify(row));
  if (data.success) {
    location.reload();
  }
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",

    header: () => <div>Title</div>,

    cell: ({ row }) => {
      return (
        <div className="font-medium capitalize">{row.getValue("title")}</div>
      );
    },
  },

  {
    accessorKey: "subject",

    header: () => <div>Subject</div>,

    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("subject")}</div>;
    },
  },

  {
    accessorKey: "status",

    header: () => <div>Status</div>,

    cell: ({ row }) => (
      <div className="lowercase"> {row.getValue("status")}</div>
    ),
  },

  {
    accessorKey: "createdAt",

    header: "Date",

    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
      };
      const formattedDate = date.toLocaleDateString("en-GB", options);

      return <div className="capitalize">{formattedDate}</div>;
    },
  },

  {
    accessorKey: "priority",

    header: () => <div className="text-right">Priority</div>,

    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("priority")}</div>
      );
    },
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
            <Link href={`/task/${task?._id}`}>
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
            </Link>

            <DropdownMenuItem onClick={() => deleteTask(task)}>
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
