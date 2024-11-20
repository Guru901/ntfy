"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectItem, Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { priorityList, statusList, subjectList } from "@/lib/contants";
import { EditFormTaskSchema, TEditFormTaskSchema } from "@/lib/type";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import getTaskById from "@/helpers/getTaskById";

export default function TaskEditForm() {
  const [editTask, setEditTask] = useState({
    title: "",
    priority: "",
    subject: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);

  let pathName = usePathname();
  pathName = pathName.split("/")[2];

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset, // Make sure to destructure reset
  } = useForm<TEditFormTaskSchema>({
    resolver: zodResolver(EditFormTaskSchema),
    // Do not set default values here. We will reset it after fetching task
  });

  async function submitEditedTask(values: TEditFormTaskSchema) {
    try {
      const { data } = await axios.post("/api/editTask", {
        title: values.title,
        status: values.status,
        priority: values.priority,
        subject: values.subject,
        _id: pathName,
      });
      if (data?.success) {
        router.push("/tasks");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const task = await getTaskById(pathName);

        setEditTask({
          priority: task.priority,
          status: task.status,
          title: task.title,
          subject: task.subject,
        });

        // Once task data is fetched, reset form default values
        reset({
          priority: task.priority,
          status: task.status,
          title: task.title,
          subject: task.subject,
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [pathName, reset]); // Reset should only trigger when pathName or reset changes

  if (loading) return <div>loading...</div>;

  return (
      <form onSubmit={handleSubmit(submitEditedTask)} className="grid gap-4">
        <div className="flex items-center gap-2 justify-end">
          <Label htmlFor="title">Title</Label>
          <Input
              {...register("title")}
              id="title"
              type="text"
              className="w-[16rem]"
          />
          {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4 w-full justify-start">
          <Label htmlFor="priority" className="text-right">
            Priority
          </Label>
          <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                  <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-[16rem]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityList.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              )}
          />
          {errors.priority && (
              <p className="text-sm text-red-500">{errors.priority.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4 w-full justify-start">
          <Label htmlFor="subject" className="text-right">
            Subject
          </Label>
          <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                  <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-[16rem]">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectList.map((subject) => (
                          <SelectItem key={subject.value} value={subject.value}>
                            {subject.label}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              )}
          />
          {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4 w-full justify-start">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Controller
              name="status"
              control={control}
              render={({ field }) => (
                  <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-[16rem]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusList.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              )}
          />
          {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="mx-2 h-4 w-4 animate-spin" />
                Submitting
              </div>
          ) : (
              "Submit"
          )}
        </Button>
      </form>
  );
}
