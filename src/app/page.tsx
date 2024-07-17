"use client";

import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import getTaskById from "@/helpers/getTaskById";
import getLoggedInUser from "@/helpers/getLoggedInUser";
import { Button } from "@/components/ui/button";
import LoginFirst from "@/components/LoginFirst/page";
import { columns } from "@/app/columns";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import DataTable from "./data-table";
import { DialogClose } from "@radix-ui/react-dialog";
import { TaskForm, Task } from "@/lib/type";
import Loader from "@/components/loader";
import { priorityList, subjectList } from "@/lib/contants";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function Home() {
  const [addTaskForm, setAddTaskForm] = useState<TaskForm>({} as TaskForm);
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User>({ _id: "" });

  interface User {
    _id: string;
  }

  useEffect(() => {
    getAllTasks();
    setUser();
  }, []);

  async function setUser() {
    setLoading(true);
    const user = await getLoggedInUser();
    setLoggedInUser(user);
    setLoading(false);
  }

  function handleTaskAddChange(e: any) {
    setAddTaskForm({
      ...addTaskForm,
      [e.target.name]: e.target.value,
    });
  }

  async function getAllTasks() {
    setLoading(true);
    const user = await getLoggedInUser();
    setLoggedInUser(user);
    const { data } = await axios.post("/api/getAllTasks", {
      id: user._id,
    });
    setTasks(data.reverse());
    setLoading(false);
  }

  async function handleTaskAddSubmit() {
    const { data } = await axios.post("/api/addTask", {
      title: addTaskForm.title,
      subject: addTaskForm.subject,
      priority: addTaskForm.priority,
      id: loggedInUser._id,
    });
    setTasks(data.tasks.reverse());
  }

  if (loading) return <Loader />;
  if (!loggedInUser?._id) return <LoginFirst />;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="px-0 py-10 flex flex-col gap-4 md:px-10">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-sm text-gray-400">
              Here is a list of your tasks for this month!
            </p>
          </div>
          <div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Filter Tasks" className="h-8" />
              <Button type="submit" variant={"outline"} className="text-xs h-8">
                Status
              </Button>
              <Button type="submit" variant={"outline"} className="text-xs h-8">
                Priority
              </Button>
            </div>
          </div>
          <div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex items-center justify-end gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Task</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Task</DialogTitle>
                      <DialogDescription>
                        Add Todo here and click submit when you are done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="title"
                          className="col-span-3"
                          onChange={handleTaskAddChange}
                          name="title"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                          Priority
                        </Label>
                        <Select
                          onValueChange={(e) =>
                            setAddTaskForm({ ...addTaskForm, priority: e })
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorityList.map((priority) => (
                              <SelectItem
                                key={priority.value}
                                value={priority.value}
                              >
                                {priority.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right">
                          Subject
                        </Label>
                        <Select
                          onValueChange={(e) =>
                            setAddTaskForm({ ...addTaskForm, subject: e })
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjectList.map((subject) => (
                              <SelectItem
                                key={subject.value}
                                value={subject.value}
                              >
                                {subject.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="submit" onClick={handleTaskAddSubmit}>
                          Save changes
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <DataTable data={tasks} columns={columns} />
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="flex flex-col gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="h-[2rem] w-full flex justify-start"
              variant="ghost"
            >
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  onChange={handleTaskAddChange}
                  name="title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select
                  onValueChange={(e) =>
                    setAddTaskForm({ ...addTaskForm, priority: e })
                  }
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
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Select
                  onValueChange={(e) =>
                    setAddTaskForm({ ...addTaskForm, subject: e })
                  }
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
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={handleTaskAddSubmit}>
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => getAllTasks()}
          variant="ghost"
          className="h-[2rem] w-full flex justify-start"
        >
          Refresh
        </Button>
      </ContextMenuContent>
    </ContextMenu>
  );
}
