import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskEditForm from "./form";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Task",
};

export default function TaskId() {
  return (
    <div className="flex items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Update the task</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3 flex-col">
          <TaskEditForm />
        </CardContent>
      </Card>
    </div>
  );
}
