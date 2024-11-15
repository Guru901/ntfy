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
import { FormEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useGetUser from "@/hooks/use-get-user";
import { Loader2 } from "lucide-react";

const addTaskFormSchema = z.object({
  title: z.string().min(1),
  subject: z.string().min(1),
  priority: z.string().min(1),
});

type TaskFormValues = z.infer<typeof addTaskFormSchema>;

export function AddTaskDialog() {
  const { user } = useGetUser();

  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
    control,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(addTaskFormSchema),
  });

  async function handleTaskAddSubmit(values: TaskFormValues) {
    try {
      await axios.post("/api/addTask", {
        title: values.title,
        subject: values.subject,
        priority: values.priority,
        id: user?._id,
      });

      location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Add Task</Button>
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
                <p className="text-red-500 text-xs">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Controller
                name="priority"
                control={control} // Link Controller to the form control
                render={({ field }) => (
                  <Select
                    value={field.value} // Explicitly bind value from Controller
                    onValueChange={(value) => field.onChange(value)} // Explicitly handle onChange to update the form state
                    name="priority" // Add name attribute for formData
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
                control={control} // Link Controller to the form control
                render={({ field }) => (
                  <Select
                    value={field.value} // Explicitly bind value from Controller
                    onValueChange={(value) => field.onChange(value)} // Explicitly handle onChange to update the form state
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
                <p className="text-red-500 text-xs">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              {isLoading ? (
                <Button type="submit" disabled className="flex gap-2">
                  <Loader2 className="animate-spin h-4 w-4" /> Adding
                </Button>
              ) : (
                <Button type="submit" onClick={handleSubmit(handleTaskAddSubmit)}>
                  Add Task
                </Button>
              )}
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
