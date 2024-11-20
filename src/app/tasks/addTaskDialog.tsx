"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { priorityList, subjectList } from "@/lib/contants";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useGetUser from "@/hooks/use-get-user";
import { Loader2 } from "lucide-react";
import { AddTaskSchema, TAddTaskSchema } from "@/lib/type";
export function AddTaskDialog() {
  const { user } = useGetUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Local state to control dialog visibility

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<TAddTaskSchema>({
    resolver: zodResolver(AddTaskSchema),
  });

  async function handleTaskAddSubmit(values: TAddTaskSchema) {
    try {
      await axios.post("/api/addTask", {
        title: values.title,
        subject: values.subject,
        priority: values.priority,
      });
      setIsDialogOpen(false);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} onClick={() => setIsDialogOpen(true)}>
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add Todo here and click submit when you are done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                {...register("title", {
                  required: true,
                })}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
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
                    name="priority"
                    defaultValue=""
                  >
                    <SelectTrigger className="w-[180px]">
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
                <p className="text-red-500 text-xs">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
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
                    <SelectTrigger className="w-[180px]">
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
                <p className="text-red-500 text-xs">{errors.subject.message}</p>
              )}
            </div>
            <DialogFooter>
              {isSubmitting ? (
                <Button type="submit" disabled className="flex gap-2">
                  <Loader2 className="animate-spin h-4 w-4" /> Adding
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={handleSubmit(handleTaskAddSubmit)} // Submit the form
                >
                  Add Task
                </Button>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
