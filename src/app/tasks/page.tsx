import { AddTaskDialog } from "./addTaskDialog";
import { Metadata } from "next";
import { Tasks } from "./tasks";

export const metadata: Metadata = {
  title: "Tasks",
};

export default function Home() {
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
          <Tasks />
        </div>
      </div>
    </div>
  );
}
