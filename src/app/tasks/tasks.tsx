"use client"

import { Loader2 } from "lucide-react";
import DataTable from "./dataTable";
import {Suspense, useEffect, useState} from "react";
import { getTasks } from "@/data-access/tasks";
import { columns } from "@/app/columns";
import axios from "axios";
import {Task} from "@/lib/type";
import {error} from "next/dist/build/output/log";

export function Tasks() {

  const [tasks, setTasks] = useState<Task[]>()
  const [tasksError, setTasksError] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const {tasks :tasksFromServer, error } = await getTasks();
        setTasks(tasksFromServer)
        if (error) {setTasksError(error)}
      } catch (error) {
        console.log(error)
      }
    })()
  }, []);

  if (tasksError) {
    console.log(error)
    return <div>Please try again</div>
  }

  return (
      <Suspense fallback={<Loader2 />}>
        {tasks && (
            <DataTable data={tasks} columns={columns} />
        )}
      </Suspense>
  );
}
