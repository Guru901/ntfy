"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getTaskById from "@/helpers/getTaskById";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { priorityList, statusList, subjectList } from "@/lib/contants";
import TaskEditForm from "./form";

export default function TaskId() {
  const [editTask, setEditTask] = useState({});
  const [loading, setLoading] = useState(true);

  let pathName = usePathname();
  pathName = pathName.split("/")[2];

  async function getTask() {
    try {
      setLoading(true);
      const task = await getTaskById(pathName);
      setEditTask(task);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="flex items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Update the task</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 flex-col">
          <TaskEditForm editTask={editTask} />
        </CardContent>
      </Card>
    </div>
  );
}
