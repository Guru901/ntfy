"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import axios from "axios";
import { Loader, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function TaskId() {
  const [editTask, setEditTask] = useState<EditFormTask>({} as EditFormTask);
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnLoading] = useState(false);

  let pathName = usePathname();
  pathName = pathName.split("/")[2];
  const router = useRouter();

  type EditFormTask = {
    _id: string;
    title: string;
    status: string;
    priority: string;
    subject: string;
  };

  const [editTaskForm, setEditTaskForm] = useState<EditFormTask>({
    _id: pathName,
    priority: editTask.priority,
    status: editTask.status,
    subject: editTask.subject,
    title: editTask.title,
  });

  async function getTask() {
    setLoading(true);
    const task = await getTaskById(pathName);
    setEditTask(task);
    setLoading(false);
  }

  async function submitEditedTask() {
    setBtnLoading(true);
    console.log(editTaskForm);
    const { data } = await axios.post("/api/editTask", editTaskForm);
    if (data?.success) {
      router.push("/");
    }
    setBtnLoading(false);
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
          <div className="grid gap-4">
            <div className="flex items-center gap-2 justify-end">
              <Label htmlFor="email">Title</Label>
              <Input
                id="title"
                type="text"
                required
                className="w-[16rem]"
                name="title"
                onChange={(e: any) =>
                  setEditTaskForm({ ...editTaskForm, title: e.target.value })
                }
                defaultValue={editTask?.title}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 w-full justify-start">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select
              defaultValue={String(editTask?.priority)}
              onValueChange={(e) =>
                setEditTaskForm({
                  ...editTaskForm,
                  priority: e,
                })
              }
            >
              <SelectTrigger className="w-[16rem]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4 w-full justify-start">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Select
              defaultValue={String(editTask?.subject)}
              onValueChange={(e) =>
                setEditTaskForm({
                  ...editTaskForm,
                  subject: e,
                })
              }
            >
              <SelectTrigger className="w-[16rem]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Maths">Maths</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Code">Code</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4 w-full justify-start">
            <Label htmlFor="subject" className="text-right">
              _Status
            </Label>
            <Select
              defaultValue={String(editTask?.status)}
              onValueChange={(e) =>
                setEditTaskForm({
                  ...editTaskForm,
                  status: e,
                })
              }
            >
              <SelectTrigger className="w-[16rem]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {btnloading ? (
            <Button type="submit" className="w-full" disabled>
              <Loader2 className="mx-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full" onClick={submitEditedTask}>
              Submit
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
