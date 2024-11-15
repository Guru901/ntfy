"use client";

import { Loader2 } from "lucide-react";
import DataTable from "./dataTable";
import useGetUser from "@/hooks/use-get-user";
import { useEffect, useState } from "react";
import { getTasks } from "@/data-access/tasks";
import { columns } from "@/app/columns";

export function Tasks() {
  const { user, error } = useGetUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getTaskError, setGetTaskError] = useState<string>("");

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
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 />
        </div>
      ) : (
        <DataTable data={tasks} columns={columns} />
      )}
    </>
  );
}
