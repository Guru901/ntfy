"use client";

import { useEffect, useState } from "react";
import { columns } from "@/app/columns";
import DataTable from "./dataTable";
import { getTasks } from "@/data-access/tasks";
import useGetUser from "@/hooks/use-get-user";
import { AddTaskDialog } from "./addTaskDialog";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getTaskError, setGetTaskError] = useState<string>("");

  const { error, user } = useGetUser();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { success, error, tasks } = await getTasks(user?._id || "");
      if (success && tasks) {
        setTasks(tasks.reverse());
        setLoading(false);
      } else {
        setGetTaskError(error!);
        setLoading(false);
      }
      setLoading(false);
    })();
  }, [user?._id]);

  if (error.length !== 0) {
    if (error !== "User not logged in") return <div>Error: {error}</div>;
  }

  if (getTaskError.length !== 0) return <div>Error: {getTaskError}</div>;

  return (
    <div className="py-10 pb-5 flex flex-col gap-4 md:px-10 px-4">
      <h1 className="text-2xl font-bold">Welcome back!</h1>
      <p className="text-sm text-gray-400">
        Here is a list of your tasks for this month!
      </p>
      <div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center justify-end gap-2">
            <AddTaskDialog />
          </div>
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
            </div>
          ) : (
            <DataTable data={tasks} columns={columns} />
          )}
        </div>
      </div>
    </div>
  );
}
